
class UserController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId); //Deixar dinâmico, para que possa ser usado em vários formulários
        this.onSubmit();

    }

    //Para pegar os dados do formulário ao clicar em "submit":

    onSubmit() {
        class UserController {

            constructor(formId, tableId) {

                this.formEl = document.getElementById(formId);
                this.tableEl = document.getElementById(tableId);

                this.onSubmit()

            }

            onSubmit() {

                this.formEl.addEventListener("submit", event => {

                    event.preventDefault();

                    this.addLine(this.getValues())

                });

            }

            getValues() {

                let user = {};

                this.formEl.elements.forEach(function (field, index) {

                    if (field.name === "gender") {

                        if (field.checked) {
                            user[field.name] = field.value
                        }

                    } else {

                        user[field.name] = field.value

                    }

                });

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


            addLine(dataUser) {

                this.tableEl.innerHTML = `
            <tr>
                <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${dataUser.admin}</td>
                <td>${dataUser.birth}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            </tr>
        `;

            }


        }
        //addEventListener para os clicks nos botões 

        //Ao clicar em submit, ele salva tudo no json. 

        this.formEl.addEventListener("submit", event => {

            event.preventDefault(); //Cancela o comportamento padrão do formulário

            //Escolha de arrow function, para que o escopo não mude para a função do addEventListener e sim para o escopo da classe UserController.

            this.addLine(this.getValues())

        });

    }

    //Colocando os dados do formulário no json

    getValues() {

        let user = {}; //Json 

        //Acessando a propriedade "elements" do formulário. É possível visualizar ela no console:
        // dir(document.getElementById("form-user-create"));  

        this.formEl.elements.forEach(function (field, index) {

            if (field.name === "gender") {

                if (field.checked) {
                    user[field.name] = field.value
                }

            } else {

                user[field.name] = field.value

            }

        });


        //Instanciando a classe User: 

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

    //Adicionando o conteúdo do json na tabela do HTML: 

    addLine(dataUser) {

        //innerHTML permite a criação de elementos com formatação HTML 
        //Usando o TemplateString

        this.tableEl.innerHTML = `
        <tr>    
            <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>
    `;

    }

}