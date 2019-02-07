//document.getElementById("validationServer01").onfocus = function() {checkValidation("validationServer01", "")};

let checkList = $(".form-control");
console.log("----------------INICIANDO------------------")
for(let x=0; x<checkList.length;x++){
    let id = checkList[x].id;
    $("#"+id).focusout(function(){ checkValidation(id)});
}

$("input[type=radio][name=input_sexo]").change(function() {
    if (this.value == "Outro") {
        $(".input_sexoOTextOpcional").show();
    }
    else {
        $(".input_sexoOTextOpcional").hide();
    }
});

$("#input_cep").focusout(function(){
    if(this.value.length > 8){
        getAddressFromCEP(this.value);
    }
})

$("select[id=input_nacionalidade2]").change(function() {
    if (this.value == "Outra") {
        $(".input_nacionalidadeOTextOpcional").show();
    }
    else {
        $(".input_nacionalidadeOTextOpcional").hide();
    }
});

$("select[id=input_etnia]").change(function() {
    if (this.value == "Outra") {
        $(".input_etniaOTextOpcional").show();
    }
    else {
        $(".input_etniaOTextOpcional").hide();
    }
});

$("legend").click(function(e){
    e.preventDefault();
    var _parent = $(this).parent("fieldset");
    newToggle(_parent);
})

criarIdsLegends();

$("button[type='submit']").click(function(){
    rodaTudoByAlex("legend");
    rodaTudoByAlex("legend");
})

input_etniaOText

carregarSelectOptions(exibirSelectOptions, "data/estados.json", "input_uf");
carregarSelectOptions(exibirSelectOptions, "data/nacionalidades.json", "input_nacionalidade");
carregarSelectOptions(exibirSelectOptions, "data/tiposSanguineos.json", "input_tipoSanguineo");
carregarSelectOptions(exibirSelectOptions, "data/estadoCivil.json", "input_estadoCivil");
carregarSelectOptions(exibirSelectOptions, "data/etnias.json", "input_etnia");
carregarSelectOptions(autocomplete, "data/naturalidades.json", "input_naturalidade");

console.log("----------------FINALIZADO-----------------")
function checkValidation(id){
    let element = $("#"+id);
    let invalid_value = element.attr("invalid-value");
    if(element.val() != invalid_value && element.val() != null){
        element.removeClass("is-invalid").addClass("is-valid");
    }else{
        element.removeClass("is-valid").addClass("is-invalid");
    }
}

function salvarFormulario(form){
    console.log(form);
}

function getAddressFromCEP(cep){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', "https://viacep.com.br/ws/"+cep+"/json/", true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) { 
      if (this.status == 200) {
          let file = new File([this.response], 'temp');
          let fileReader = new FileReader();
          let data = null;
          fileReader.addEventListener('load', function(){
            data = JSON.parse(fileReader.result);
            exibirInformacoesEndereco(data);
          });
          fileReader.readAsText(file);
      } 
    }
    xhr.send();
}

function exibirInformacoesEndereco(endereco){
    console.log(endereco)
    $("#input_cidade").val(endereco.localidade).addClass('is-valid');
    $("#input_uf").val(endereco.uf).addClass('is-valid');
    $("#input_logradouro").val(endereco.logradouro).addClass('is-valid');
    $("#input_bairro").val(endereco.bairro).addClass('is-valid');
    if(endereco.complemento){$("#input_complemento").val(endereco.complemento).addClass('is-valid')};
}

function carregarSelectOptions(func, path, id) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) { 
      if (this.status == 200) {
          let file = new File([this.response], 'temp');
          let fileReader = new FileReader();
          let data = null;
          fileReader.addEventListener('load', function(){
            data = JSON.parse(fileReader.result);
            func(id, data);
          });
          fileReader.readAsText(file);
      } 
    }
    xhr.send();
}

function exibirSelectOptions(id, options){
    let select = document.getElementById(id);
    for(let i = 0; i < options.length; i++) {
        let opt = options[i];
        let el = document.createElement("option");
        el.textContent = opt;
        if(id=="input_uf"){
            el.value = opt.substring(opt.length-3,opt.length-1);
        }
        else{
            el.value = opt;
        }
        select.appendChild(el);
    }
}

function newToggle (elemento)
{
    if(elemento.hasClass("opened"))
    {
        if(checkValid(elemento) == 0)
        {
            elemento.addClass("valido");
        }
        else
        {
            elemento.addClass("invalido");
        }
        elemento.removeClass("opened");
        elemento.addClass("closed");
    }
    else
    {
        elemento.removeClass("invalido");
        elemento.removeClass("valido");
        elemento.removeClass("closed");
        elemento.addClass("opened");
    }
}

function checkValid(elemento)
{
    var _allInputs = $(":input[required]", elemento);
    var _allValid = $(":input.is-valid[required]", elemento);
    return _allInputs.length - _allValid.length;
}

function rodaTudoByAlex(elemento){ 
    elemento = $(elemento);
    for(let x = 0; x<elemento.length; x++)
    { 
        $("#"+elemento[x].id).trigger("click");
    }
}

function criarIdsLegends()
{
    let l = $("legend");
    for(let x = 0; x<l.length; x++){
        l[x].id = "legend"+(x+1);
    }
}