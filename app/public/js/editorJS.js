//colocando o foco na linha quando carrega a tela
$(document).ready(() => {
    $('#linha_1').text('').focus();
    $('#linha_1').addClass('p-color-back');
    
});

//trazendo o foco novamente quando selecionada a linha
$('input').click(function() {
    $(`#linha_${this.defaultValue}`).focus();
});

//atualizando números das linhas quando apagadas ou crianas no meio
function atualizaLinhas() {
    
}

//caputrando ENTER no p (CRIANDO NOVAS COISAS)
$('#editor').on('keypress', 'p', function(key) {
    if(key.which == 13) {
        //criando nova linha e incrementadno contador (SECTION LINHA)
        let linhaAtual = parseInt($(`#contador_linha_${this.id.split('_')[1]}`).val()) + 1;
       $('#linha').append(`<input 
            id="contador_linha_${linhaAtual}" 
            type="button" 
            class="btn btn-sm btn-dark p-0 m-0" 
            value="${linhaAtual}" >`);
        
        //criando novo p dentro (SECTION EDITPO)
        $('#editor').append(`<p 
            id="linha_${linhaAtual}" 
            class="text-break p-color-back p-0 m-0" 
            contenteditable="true"></p>`);

        //atualizando numeros das linhas
        atualizaLinhas();

        //dando o foco para a nova linha
        $(`#linha_${linhaAtual}`).focus();
    }
});

//Capturando BACKSPACE no p (DELETANDO AS COISAS)
$('#editor').on('keyup', 'p', function(key){
    if(key.which == 8){

        //vendo se a linhas esta vazia && diferente da primeira linha
        if(this.textContent == "" && this.id != 'linha_1') {

            //tirando uma linha (SECTION LINHA)
            let linhaRemove = parseInt($(`#contador_linha_${this.id.split('_')[1]}`).val());
            
            $(`#contador_linha_${linhaRemove}`).remove();
            
            //romovendo novo p dentro (SECTION EDITPO)
            $(`#linha_${linhaRemove}`).remove();

            //atualizando numeros das linhas
            atualizaLinhas();
    
            //dando o foco linha de cima
            $(`#linha_${linhaRemove - 1}`).offset().focus();
            //$(`#linha_${linhaRemove - 1}`).trigger("keydown", {which: 40});
        }
    }
});

//Capturando setas up e down no p (MOVENDO CURSOR)
$('#editor').on('keyup', 'p', function(key){

    //keyup
    if(key.which == 38){

        //verificando se tem linha em cima
        if(this.id != 'linha_1') {
            let linhaAtual = parseInt($(`#contador_linha_${this.id.split('_')[1]}`).val());

            $(`#linha_${linhaAtual - 1}`).focus();
        }
    }

    //keydown
    if(key.which == 40) {
        let proximaLinha = parseInt($(`#contador_linha_${this.id.split('_')[1]}`).val()) + 1;
        $(`#linha_${proximaLinha}`).focus();
    }
});

