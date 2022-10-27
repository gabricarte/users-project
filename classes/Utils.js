class Utils {

    //Método para formatar as datas
    //Como é estático, não é necessário instanciar a classe "Utils"

    static dateFormat(date) {

        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();

    }



}