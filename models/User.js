
class User {

    constructor(name, gender, birth, country, email, password, photo, admin) {

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    }

    loadFromJSON(json) {

        //para cada nome de propriedade 

        for (let name in json) {

            switch (name) {

                case '_register':
                    this[name] = new Date(json[name]);
                    break;

                default:
                    this[name] = json[name];
            }

        }

    }


    //Retorna os users cadastrados
    static getUsersStorage() {

        let users = [];

        //Se existir users cadastrados 
        if (localStorage.getItem("users")) {

            //transforma em json o conteúdo que já está no localStorage como string
            users = JSON.parse(localStorage.getItem("users"));

        }

        return users; //users nesse caso, é um array constituído por objetos

    }

    //Gera um novo id para o usuário que não possuir um 
    getNewId() {

        if (!window.id) window.id = 0; //o window mantém o escopo global 

        id++;

        return id;

    }


    //Salva o usuário no localStorage 
    save() {

        //adiciona no localStorage os dados do novo usuário como string

        let users = User.getUsersStorage(); //Localiza todos os users que está no Local Storage e retorna um array


        if (this.id > 0) {

            users.map(u => {

                if (u._id == this._id) {

                    Object.assign(u, this); //mesclando dois objetos


                }

                return u;

            })

            // caso o id não exista
        } else {

            this._id = this.getNewId();

            users.push(this); //Adiciona no array os dados do usuário que está sendo recebido no método no momento 

        }

        localStorage.setItem("users", JSON.stringify(users));

    }




    //Getters and setters

    get id() {
        return this._id;
    }

    get register() {
        return this._register;
    }

    get name() {
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get birth() {
        return this._birth;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get photo() {
        return this._photo;
    }

    get admin() {
        return this._admins;
    }

    set photo(value) {

        this._photo = value;

    }

    set admin(value) {
        this._admin = value;
    }

}