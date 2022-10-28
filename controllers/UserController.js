
class UserController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
        this.onEdit();

    }

    //Para pegar os dados do formulário ao clicar em "submit":

    onSubmit() {

        this.formEl.addEventListener("submit", event => {

            event.preventDefault(); //Cancela o comportamento padrão do formulário de recarregar a página

            let btn = this.formEl.querySelector("[type=submit]")//Para encontrar o botão dentro do formulário

            btn.disabled = true; //trava o botão para deixar ele disponível só após a limpeza do formulário

            let values = this.getValues();

            if (!values) {
                return false;
            }

            //A primeira função é se ocorrer certo, a segunda errado. 

            this.getPhoto().then(content => {

                values.photo = content;   //sobrescrevendo a propriedade photo

                this.addLine(values);

                this.formEl.reset(); //limpa o formulário

                btn.disabled = false;


            }, function (e) {

                console.error(e); //Exibe a mensagem de erro

            });


        });

    }

    getPhoto() {

        //Se der certo (resolve), se der errado (rejectS)

        // o new serve para instanciar a classe "Promise"

        return new Promise((resolve, reject) => {

            let fileReader = new FileReader();

            //Retornando apenas o campo do array que possui a foto 

            let elements = [...this.formEl.elements].filter(item => {

                if (item.name == "photo") {
                    return item;
                };

            });


            let file = elements[0].files[0]; //Arquivo carregado. Como elements ainda é array, apesar de filtrado, o índice é o primeiro. E files também é um array, pois pode conter mais de um arquivo

            //on load é quando a foto terminar de carregar. A função que retorna é o que se deve fazer quando terminar 
            // o carregamento da foto 

            fileReader.onload = () => {

                resolve(fileReader.result);

            }

            fileReader.onerror = (e) => {
                reject(e)
            } //Função do filereader caso der algum erro. Recebe o erro e o mostra, utilizando reject. 


            if (file) {
                fileReader.readAsDataURL(file);
            }
            else { //Caso a file não existir, usar a imagem padrão
                resolve('dist/img/boxed-bg.jpg')
            }

        })


    }


    //Acessando a propriedade "elements" do formulário. É possível visualizar ela no console:
    // dir(document.getElementById("form-user-create"));  

    getValues() {

        let user = {}; //Json

        let isValid = true; //Se o formulário está válido

        //"..." Operador spread
        [...this.formEl.elements].forEach(function (field, index) {

            //validando se os campos obrigatórios do formulário foram preenchidos:

            //checa o que está dentro do array e procura. Além disso, verifica se não é vazio
            if (['name', 'email', 'password'].indexOf(field.name) > - 1 && !field.value) {

                field.parentElement.classList.add('has-error');
                isValid = false; //Se achar um erro, escapa do envio do formulário

            }

            if (field.name === "gender") {

                //M ou F 
                if (field.checked) {
                    user[field.name] = field.value
                }

            } else if (field.name == "admin") {

                user[field.name] = field.checked; //checked testa se está marcado ou não e retorna booleano
            }

            else {

                user[field.name] = field.value

            }

        });


        if (!isValid) {

            return false; //para o envio do formulário

        }

        //Instanciando a classe User, colocando os parâmetros do Json.  
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );

    }

    //Parte do "View" do MVC:

    //Adicionando o conteúdo do json na tabela do HTML: 

    addLine(dataUser) {

        //innerHTML permite a criação de elementos com formatação HTML 
        //Usando o TemplateString (if ternário)

        let tr = document.createElement('tr');

        //Coloca o user, variável json em forma de string dentro de tr. 
        tr.dataset.user = JSON.stringify(dataUser);

        let adminInput = document.querySelector("#checkbox");

        tr.innerHTML = `
        <tr>
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>

            <td>${adminInput.checked ? dataUser.admin = "Sim" : dataUser.admin = "Não"
            }</td>

            <td>  ${Utils.dateFormat(dataUser.register)}  </td>

            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>

        </tr >
    `;

        //Capturando o evento de click no botão "editar". 
        //Salvando as informações do json no formulário "Editar Usuário"

        tr.querySelector(".btn-edit").addEventListener("click", e => {

            //transforma o elemento em json novamente
            let json = JSON.parse(tr.dataset.user);

            let form = document.querySelector("#form-user-update");

            //Pega o nome da propriedade no json e salva em 
            for (let name in json) {

                //Para encontrar o campo "[]" que o nome começa com  cada "name" de  propriedade do json
                let field = form.querySelector("[name=" + name.replace("_", "") + "]")

                //Se o campo existir e não for um arquivo, salvar no "value" o que está no json.
                if (field) {

                    if (field.type == 'file') {
                        continue;   //Palavra reservada, ignora o restante das instruções e avança 
                    }

                    field.value = json[name];

                }
            }


            this.showPanelUpdate();


        })

        this.tableEl.appendChild(tr);

        this.updateCount();


    }

    //Toda vez que adiciono uma linha, chama o método para atualizar a contagem na tela
    updateCount() {

        let numberUsers = 0;
        let numberAdmin = 0;


        [...this.tableEl.children].forEach(tr => {

            numberUsers++;

            //Transforma a string tr.dataset.user em JSON
            let user = JSON.parse(tr.dataset.user);

            if (user._admin) {
                numberAdmin++;
            }

        })

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;
    }


    //Ao clicar no botão "cancelar", sai do formulário de edição e volta no de criar usuário
    onEdit() {

        //localiza a classe .btn-cancel
        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e => {

            this.showPanelCreate();

        })


    }

    showPanelCreate() {
        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";

    }

    showPanelUpdate() {
        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";
    }


}