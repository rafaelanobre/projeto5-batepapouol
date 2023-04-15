axios.defaults.headers.common['Authorization'] = 'Da3XNfDHx4X7NJWZEq9v7eO1';

//criar objeto user com o rótulo name
let user= {};

function enterUsername(){
    //pegar o nome do input e colocar no objeto
    user = {
        name: document.getElementById("login").value
    }
    
    //declarar a variavel da requisição
    //enviar para o sevidor com api post
    const promise = axios.post ('https://mock-api.driven.com.br/api/vm/uol/participants', user);
    document.querySelector(".user-input").classList.add("hidden");
    document.querySelector(".loading").classList.remove("hidden");

    //se retornar status 200:
    promise.then(reply => {
        if (reply.status === 200) {
            //dar hidden na página de carregando
            document.querySelector(".user-login").classList.add("hidden");
            //tirar o hidden do header, main e footer
            document.querySelector(".header").classList.remove("hidden");
            document.querySelector(".main").classList.remove("hidden");
            document.querySelector(".footer").classList.remove("hidden");

            //chamar a função renderMessages com then
            renderMessages();
            setInterval(renderMessages, 3000);
        }
    });

    //se retornar status 400:
    promise.catch(reply => {
        if (reply.status === 400) {
            //alert com o erro
            alert("Já existe outro usuário com esse nome na sala, escolha outro para entrar");

            //recarregar a página
            window.location.reload()
        }
    });
}

function renderMessages(){
    //declarar a variavel da requisição
    //buscar mensagens antigas com o api get
    //criar um loop for que renderiza cada mensagem do array separada
    //usar if para ver se é status ou mensagem

    //usar o código abaixo enquanto renderiza
    //const elementoQueQueroQueApareca = document.querySelector('.mensagem');
    //elementoQueQueroQueApareca.scrollIntoView();
}

function newUsername(){
    //alert de escolher um novo nome de usuário
    //reload página para zerar usando
    //window.location.reload()
}

function sendMessage(){
    //criar um objeto mensagem
    //pegar o texto para o objeto do input
    //exibir se está enviando público ou privado

    //declarar a variavel da requisição
    //enviar para o sevidor com api const
    //chamar newMessages
}

function enter(){
    //ao clicar no enter
    //chama a funcao sendmessage
}

function newMessages(){
    //igual a função renderMessages
    //mas essa vai só adicionar as novas mensagens no innerhtml
}
//usar set interval 3000
setInterval(newMessages, 3000);


function loginChat(){
    axios.post('https://mock-api.driven.com.br/api/vm/uol/status', user)
    //usar post para a url com o usuário
}
//usar set interval 5000
setInterval(loginChat, 5000);


//Bônus: Layout menu lateral
//Bônus: API Buscar participantes