import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const supabaseUrl = "https://azdbtprxutbsauqhidru.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZGJ0cHJ4dXRic2F1cWhpZHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NTY5MTUsImV4cCI6MjA1NjMzMjkxNX0.MgIIBsioJo2KFe5iyYUvdmu-FScZ_WKKT4-U2zF_xdU";
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            await login();
        });
    } else {
        alert("Eroare: Nu s a gasit formularul de login");
    }
});

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validateEmail(email) || !validatePassword(password)) {
        alert('Email/Parola invalid');
        return;
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            throw error;
        }

        alert("Autentificare reusita");
        window.location.href = "./user-panel/user_pages/abonamenteactive.html";
    } catch (error) {
        alert("Autentificare esuata: " + error.message);
    }
}

function validateEmail(email) {
    const expression = /^[a-zA-Z0-9._]+@(yahoo\.com|gmail\.com|outlook\.com)$/;
    return expression.test(email);
}

function validatePassword(password) {
    const expression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    return expression.test(password);
}
