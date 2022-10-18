var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};

fields.forEach(function (field, index) {

    //field = parâmetro do forEach 

    if (field.name == "gender") {

        user[field.name] = field.value;

    } else {

        user[field.name] = field.value; //Adicionando uma propriedade ao objeto. 

    }

    // console.log(field.name, field.id, field.checked, index);

}
)

console.log(user);

