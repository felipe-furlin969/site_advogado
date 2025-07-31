// Suavizar

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();
        
    document.querySelector(this.getAttribute('href')).scrollIntoView({
    behavior: 'smooth'
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contato-form');
    if (form) {
        form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        form.reset();
        });
    }
});

// contato

document.querySelector('.contato-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const button = document.getElementById('submit-btn');
    const feedback = document.getElementById('form-feedback');
    
    // Feedback visual
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span> Enviando...';
    feedback.textContent = '';
    feedback.style.color = 'inherit';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            feedback.textContent = '✔ Mensagem enviada com sucesso!';
            feedback.style.color = 'green';
            form.reset();
            
            // Redirecionamento após 3 segundos
            const redirectUrl = form.querySelector('[name="_next"]').value;
            if (redirectUrl) {
                setTimeout(() => { window.location.href = redirectUrl; }, 3000);
            }
        } else {
            throw new Error('Falha no envio');
        }
    } catch (error) {
        feedback.textContent = '✖ Ocorreu um erro. Por favor, tente novamente.';
        feedback.style.color = 'red';
        console.error('Erro no envio:', error);
    } finally {
        button.disabled = false;
        button.textContent = 'Enviar Mensagem';
    }
});