// ===============================
// 🔹 FUNÇÃO DO TOAST (mensagem)
// ===============================
function mostrarToast(mensagem, tempo = 300, cor = "#333"){
    const toast = document.getElementById("toast")

    toast.textContent = message = mensagem; // Mantido seu padrão
    toast.style.backgroundColor = cor;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, tempo);
}

// ===============================
// 🔹 FORMULÁRIO BOTAO ENVIAR
// ===============================
const form = document.getElementById("form-contato")
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const btn = document.getElementById("btn-enviar");
        if(!btn) return;

        btn.value = "Enviando...";
        btn.disabled = true;

        mostrarToast("Enviando mensagem...", 3000, "#555")

        const dados = {
            name: document.getElementById("nome").value, 
            senderEmail: document.getElementById("email").value,
            phone: document.getElementById("telefone").value,
            message: document.getElementById("mensagem").value
        };

        try {
            const response = await fetch("https://mailapi-production-f9f2.up.railway.app/api/v1/emails/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            // Captura se a API retornar erro estruturado
            if (response.ok) {
                mostrarToast("Mensagem enviada com sucesso!", 5000, "#56aa43");
                form.reset();
            } else {
                // Se a API mandar uma mensagem de erro no JSON, capturamos ela, senão exibe o texto padrão
                try {
                    const errorData = await response.json();
                    mostrarToast(errorData.message || "Erro ao enviar mensagem.", 3000, "#ff4d4d");
                } catch {
                    mostrarToast("Erro ao enviar mensagem.", 3000, "#ff4d4d");
                }
            }

        } catch(error) {
            console.error(error);
            mostrarToast("Erro ao conectar com o servidor.", 3000, "#ff4d4d")
        } finally {
            btn.value = "ENVIAR";
            btn.disabled = false;
        }
    });
}

// ==========================================
// MÁSCARA DE TELEFONE (FORMATO BRASIL)
// ==========================================
function maskTel(input) {
    let value = input.value;

    // Remove tudo o que não for número
    value = value.replace(/\D/g, "");

    // Aplica a máscara (00) 00000-0000
    if (value.length > 0) {
        value = "(" + value;
    }
    if (value.length > 3) {
        value = value.slice(0, 3) + ") " + value.slice(3);
    }
    if (value.length > 10) {
        value = value.slice(0, 10) + "-" + value.slice(10);
    }

    // Atualiza o valor do input
    input.value = value;
}