axios.defaults.headers.common['Authorization'] = 'Da3XNfDHx4X7NJWZEq9v7eO1';

//criar objeto user com o rótulo name
let user= {};

//criar um objeto mensagem
let textMessage = {
    from: "",
    to: "Todos",
    text: "",
    type: "message"
}



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
            getMessages();
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

    //usar set interval para manter conectado
    setInterval(loginChat, 5000);
}

function loginChat(){
    axios.post('https://mock-api.driven.com.br/api/vm/uol/status', user)
    //usar post para a url com o usuário
}   



function getMessages(){
    //declarar a variavel da requisição
    //buscar mensagens antigas com o api get
    const promise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');

    promise.then(renderMessages);
}



function renderMessages(reply){
    let messages = document.querySelector(".messages");
    messages.innerHTML = "";

    //criar um loop for que renderiza cada mensagem do array separada
    //usar if para ver se é status ou mensagem
    for (let i=0; i< reply.data.length; i++){
        console.log(reply);

        //renderiza os status
        if (reply.data[i].type === "status"){
            messages.innerHTML += `<li class="status">
            <p><span style="color: #AAAAAA">(${reply.data[i].time})</span> <strong>${reply.data[i].from}</strong> ${reply.data[i].text}</p>
            </li>`
        }

        //renderiza as mensagens
        else if (reply.data[i].type === "message"){
            messages.innerHTML += `<li class="message">
            <p><span style="color: #AAAAAA">(${reply.data[i].time})</span> <strong>${reply.data[i].from}</strong> para <strong>${reply.data[i].to}:</strong> ${reply.data[i].text}</p>
            </li>`
        }
    }

    //usar o scrollintoview enquanto renderiza
    messages.scrollIntoView({ block: "end" });
} 



function sendMessage(){
    //pegar o texto para o objeto do input
    textMessage = {
        from: user.name,
        to: "Todos",
        text: document.getElementById("message").value,
        type: "message"
    }
    /*textMessage = {
        from: user.name,
        text: document.getElementById("message").value
    }*/

    //declarar a variavel da requisição
    //enviar para o sevidor com api const
    const promise = axios.post ('https://mock-api.driven.com.br/api/vm/uol/messages', textMessage);

    //se a mensagem for enviada com sucesso
    promise.then(reply => {
        //chamar a função que renderiza mensagens
        getMessages();
    });

    //se a mensagem não for enviada com sucesso
    promise.catch(reply => {
        //recarregar a janela
        console.log(reply)
        console.log(textMessage)
        //window.location.reload();
    });

    document.getElementById("message").value = ""
    textMessage = ""
}



function enter(){
    //ao clicar no enter
    //chama a funcao sendmessage
}



function newMessages(){
    //igual a função getMessages
    //mas essa vai só adicionar as novas mensagens no innerhtml
}
//usar set interval 3000
setInterval(getMessages, 3000);







//Bônus: Layout menu lateral
//Bônus: API Buscar participantes