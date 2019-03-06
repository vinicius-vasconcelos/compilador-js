//Função para criar linhas ao carregar a página
$(document).ready(() => {

    //deixando input file invisivel
    $('#arq_uploads').css({opacity: 0});

    //criando numeração pras linhas
    for(let i = 2; i <= 108; i++) {
        $('#numeracao').append(`<input 
            id="contador_linha_${i}" 
            type="button" 
            class="btn btn-sm btn-dark p-0 m-0" 
            value="${i}" >`);
    }

    //trazendo o foco para a primeira linha
    $('#linha').text('').focus();
    $('#linha').addClass('p-color-back');
    $('#linha').append('<br>');
});

/*//caputrando ENTER no p (CRIANDO NOVAS COISAS)
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
});*/

/*
//Função para abrir arquivo selecionado
$('input[type=file]').bind('change', function() {
    let fileName = $(this).val();

    if(fileName.length > 0) {
        console.log('here');
        $.get(fileName, data => console.log('txt'), 'text'); //$('#linha').text(txt)
    }
    
});*/

/*
//pintar palavras reservadas
$('#linha').keyup(() => {
    let palavra = $('#linha').text()
    if(palavra == 'for') {
        $('#linha').html('&nbsp <span style="color: black">for</span> &nbsp');

        #('#linha').trigger('kreypress', {which:35})
    }
});*/

//ajax de compilador
$('#compilar').click(() => {
    let codigo = $('#linha').html();

    $.ajax({
        url: '/compilar',
        method: 'post',
        data: {codigo: codigo},
        success: respText => {
            console.log('Sucesso = ' + respText);
        },
        error: err => {
            console.log('Erro = ' + JSON.stringify(err));
        }
    });
});