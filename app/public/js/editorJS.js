//Função para criar linhas ao carregar a página
$(document).ready(() => {
    //trazendo o foco para a primeira linha
    $('#linha').text('').focus();
    $('#linha').addClass('p-color-back');
    $('#linha').append('<br>');

    desenharLinhas();
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


$('#linha').on('input', function() {
    desenharLinhas();
});

//Função para abrir arquivo selecionado
$('input[type=file]').bind('change', function() {
    if(this.files.length != 1) return;

    const file = this.files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        if(e.target.result.indexOf('data:text/plain;base64,') != 0) {
            console.error("Falha ao ser o arquivo, não é um texto!");
            return;
        }

        const textFile = window.atob(e.target.result.replace('data:text/plain;base64,', '').trim());
        $('#linha').html(text2DivShow(textFile)).focus();
    };
    reader.readAsDataURL(file);    
});


//pintar palavras reservadas
// $('#linha').keyup(() => {
//     let palavra = $('#linha').text()
//     if(palavra == 'for') {
//         $('#linha').html('&nbsp <span style="color: black">for</span> &nbsp');

//         // #('#linha').trigger('kreypress', {which:35})
//     }
// });

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


// Funções para melhorar o Funcionamento
function desenharLinhas() {
    const maxLinha = $("#linha > div").length + 1;
    const linhasDesenhadas = $('#numeracao > input').length;
    console.log(linhasDesenhadas, maxLinha);

    //criando numeração pras linhas
    for(let i = linhasDesenhadas; i < maxLinha; i++) {
        $('#numeracao').append(`<input 
            id="contador_linha" 
            type="button" 
            class="btn btn-sm btn-dark p-0 m-0" 
            value="${i+1}" >`);
    }

    // Apaga as Linhas que não existem mais!
    if(linhasDesenhadas > maxLinha) {
        for(let i = maxLinha+1; i <= linhasDesenhadas; i++) {
            $(`#numeracao input#contador_linha[value="${i}"]`).remove();
        }
    }
}

function text2DivShow(textOriginal) {
    const linhas = textOriginal.replace(/(?:\r\n|\r|\n)/g, '\n').split('\n');

    let textReturn = '';
    for(i in linhas) {
        textReturn += '<div>'+linhas[i]+'</div>'
    }

    return textReturn;
}