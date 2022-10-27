
class UserController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId); //Deixar dinâmico, para que possa ser usado em vários formulários
        this.onSubmit();

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
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>

        </tr >
    `;

        this.tableEl.appendChild(tr);

        this.updateCount();


    }

    //Toda vez que adiciono uma linha, chama o método para atualizar a contagem
    updateCount() {

        console.dir(this.tableEl);

    }


}