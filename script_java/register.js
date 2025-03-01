import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://azdbtprxutbsauqhidru.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZGJ0cHJ4dXRic2F1cWhpZHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NTY5MTUsImV4cCI6MjA1NjMzMjkxNX0.MgIIBsioJo2KFe5iyYUvdmu-FScZ_WKKT4-U2zF_xdU";
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("register-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        await register();
    });
});

async function register() {
    try {
        const first_name = document.getElementById("first-name").value;
        const last_name = document.getElementById("last-name").value;
        const cnp = document.getElementById("cnp").value;
        const bdate = document.getElementById("bdate").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const re_type_password = document.getElementById("re-type_password").value;

        if (password !== re_type_password) {
            alert("Eroare: Parolele nu se potrivesc!");
            return;
        }

        if (!validateEmail(email) || !validatePassword(password) || !validateCNP(cnp)) {
            alert("Eroare: Unul sau mai multe câmpuri sunt invalide!");
            return;
        }
        alert("Înregistrare în curs...");
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            console.error("Auth error:", error);
            alert("Eroare la autentificare: " + error.message);
            return;
        }

        const user = data.user;
        if (!user) {
            alert("Eroare: Utilizatorul nu a fost creat.");
            return;
        }

        alert("Utilizator creat, salvăm datele...");
        const { error: dbError } = await supabase
            .from("users")
            .insert([
                {
                    first_name,
                    last_name,
                    cnp,
                    bdate,
                    email
                }
            ]);

        if (dbError) {
            console.error("DB error:", dbError);
            alert("Eroare la salvarea datelor în baza de date: " + dbError.message);
            return;
        }

        alert("Utilizator înregistrat cu succes!");
        window.location.href = "/index.html";
    } catch (err) {
        console.error("Unexpected error:", err);
        alert("Eroare neașteptată: " + err.message);
    }
}


function validateEmail(email) {
    const expression = /^[a-zA-Z0-9._]+@(yahoo\.com|gmail\.com|outlook\.com)$/;
    return expression.test(email);
}

function validatePassword(password) {
    const expression =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    return expression.test(password);
}


function validateCNP(cnp){
const checker1=/^[A-Z0-9]{13}$/;
if(!checker1.test(cnp)){
    return false;
}

const multiplicatori=[2,7,9,1,4,6,3,5,8,2,7,9];
let sum_m=0;
for(let i=0;i<12;i++){
    sum_m+=parseInt(cnp[i])*multiplicatori[i];
}
const rest_sum=sum_m%11;
if(rest_sum===10){
    rest_sum=1;
    if (rest_sum===parseInt(cnp[12])){
        return rest_sum===parseInt;
    }
    else{
        return false;
    }
}

}

