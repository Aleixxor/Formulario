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
    var _toggler = _parent.children(".toggler");
    _toggler.toggle();
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
    $("#input_cidade").val(endereco.localidade);
    $("#input_uf").val(endereco.uf);
    $("#input_logradouro").val(endereco.logradouro);
    $("#input_bairro").val(endereco.bairro);
    $("#input_complemento").val(endereco.complemento);
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

function toggleSection(){
    alert('entrou caraio');
}