//criando linhas ao carregar a página
$(document).ready(() => {
    //criando numeração pras linhas
    for(let i = 2; i <= 100; i++) {
        $('#linha').append(`<input 
            id="contador_linha_${i}" 
            type="button" 
            class="btn btn-sm btn-dark p-0 m-0" 
            value="${i}" >`);
    }

    $('#linha_1').text('').focus();
    $('#linha_1').addClass('p-color-back');
    
});

//trazendo o foco novamente quando selecionada a linha
$('input').click(function() {
    $(`#linha_${this.defaultValue}`).focus();
});

function ajustarIdLinha(linhaA, acao) {
    let ultimoFilho = parseInt($('#editor')[0].childElementCount);
    let linhaAtual = parseInt(linhaA)

    if(acao == 'insert') {
        //altrando id das linhas
        $('#editor p').each( function(item) {
            $(this).prop('id', `linha_${parseInt(item) + 1}`);
        });

        
        /*for(let i = linhaA; i < ultimoFilho; i++)
            $(`#linha_${i + 1}`).text($(`#linha_${i}`).text()); */

        /*if(linhaTxt != '') {
            for(let i = linhaA ; i < ultimoFilho ; i++) 
                $(`#linha_${i}`).text($(`#linha_${i+1}`).text()); 
        }
        else
            console.log('Não tem')*/

        $(`#linha_${linhaA+1}`).focus();
    }
    else {
        if(acao == 'delete') {
            console.log('aqui');
            //trocando os conteudos das linhas
            for(let i = linhaAtual ; i < ultimoFilho ; i++) 
                $(`#linha_${i}`).text($(`#linha_${i+1}`).text()); 

            $(`#linha_${ultimoFilho}`).remove();
            $(`#linha_${linhaAtual - 1}`).focus();
        }
    }
}

//caputrando ENTER no p (CRIANDO NOVAS COISAS)
$('#editor').on('keypress', 'p', function(key) {

    if(key.which == 13) {
        //caputrando linha de ação
        let linhaAtual = parseInt(this.id.split('_')[1]);

        //criando novo p dentro (SECTION EDITPO)
        $('#editor').append(`<p 
            id="linha" 
            class="text-break p-0 m-0 p-color-back" 
            contenteditable="true"></p>`);

        //dando o foco para a nova linha
        ajustarIdLinha(linhaAtual, 'insert');
    }
});

//Capturando teclado
$('#editor').on('keyup', 'p', function(key){
    //Capturando BACKSPACE no p (DELETANDO AS COISAS)
    if(key.which == 8){
        //caputrando linha de ação
        let linhaAtual = parseInt($(`#contador_linha_${this.id.split('_')[1]}`).val());

        //vendo se a linhas esta vazia && diferente da primeira linha
        console.log(this.textContent)
        if(this.textContent == "") {
            console.log('bora delatea')
            ajustarIdLinha(linhaAtual, 'delete');
        }
    }

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

//Capturando setas up e down no p (MOVENDO CURSOR)
/*$('#editor').on('keyup', 'p', function(key){

    
});*/