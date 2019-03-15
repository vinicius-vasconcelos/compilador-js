/*
    *** "analisadorSintatico" chama o "vefificaInicio"
    *** verifica inicio é responsável por "chicoman" e instâncias de variáveis
            quando encontrado estrutura de controle ou repetição é chamado o "verificaCorpo"
    *** "verificaCorpo" verfica estruturas de repetição,controle e expressões
    *** NÃO É PERMITIDA A DECLARAÇÃO OU INSTÂNCIA DE VARIÁVEIS NO CORPO DO PROGRAMA !!!
*/

module.exports = function(application) {
    pos = 0;

    this.analisadorSintatico = tabelaSimbolos => {
        //console.log(tabelaSimbolos)
        return new Promise((resolve, reject) => {
            resolve(verificaInicio(tabelaSimbolos));
        });
    }

    //função verificadora do inicio de programa
    function verificaInicio(tabelaSimbolos) {
        if(TAM(tabelaSimbolos)) {    
            if(tabelaSimbolos[pos].token == 't_inicio') {
                tabelaSimbolos[pos].statusSintatico = true;
                tabelaSimbolos[pos].erroSintatico = '';
            }
            else {
                tabelaSimbolos[pos].statusSintatico = false;
                tabelaSimbolos[pos].erroSintatico = 'Código deve-se iniciar com "chicoman "';
            }
        }

        pos = pos + 1;

        while(pos < tabelaSimbolos.length) {
            //chamar o próximo token
            switch(tabelaSimbolos[pos].token) {
                //tipos_especificos (insâncias de variáveis)
                case 't_integer':
                    tabelaSimbolos[pos].statusSintatico = true;
                    tabelaSimbolos[pos].erroSintatico = '';
                    verificaInstanciaVar(tabelaSimbolos);
                break;

                case 't_float':
                    tabelaSimbolos[pos].statusSintatico = true;
                    tabelaSimbolos[pos].erroSintatico = '';
                    verificaInstanciaVar(tabelaSimbolos);
                break;

                case 't_string':
                    tabelaSimbolos[pos].statusSintatico = true;
                    tabelaSimbolos[pos].erroSintatico = '';
                    verificaInstanciaVar(tabelaSimbolos);
                break;

                case 't_expoente':
                    tabelaSimbolos[pos].statusSintatico = true;
                    tabelaSimbolos[pos].erroSintatico = '';
                    verificaInstanciaVar(tabelaSimbolos);
                break;

                //ou (taestudando?|enquantonaoestudar|atelerlivros|expressao)
                case 't_if':
                    verificaCorpo(tabelaSimbolos)
                break;

                case 't_for':
                    verificaCorpo(tabelaSimbolos)
                break;

                case 't_while':
                    verificaCorpo(tabelaSimbolos)
                break;

                case 't_id':
                    verificaCorpo(tabelaSimbolos)
                break;

                default:
                    tabelaSimbolos[pos].statusSintatico = false;
                    tabelaSimbolos[pos].erroSintatico = `'Deixa eu ver qq acontece !' token =  ${tabelaSimbolos[pos].token} linha = ${tabelaSimbolos[pos].linha}`;
                break;
            }
            pos = pos + 1;
        }

        return tabelaSimbolos;
    }

    //função para verificar resto do código exceto instancias de váriaveis
    function verificaCorpo(tabelaSimbolos) {

        while(pos < tabelaSimbolos.length) {
            //chamar o próximo token
            switch(tabelaSimbolos[pos].token) {

                //Estruturar de controle, repetição ou expressões
                case 't_if':
                    tabelaSimbolos[pos].statusSintatico = true;
                    tabelaSimbolos[pos].erroSintatico = '';
                    verificaIf(tabelaSimbolos);
                break;

                case 't_for':
                    tabelaSimbolos[pos].statusSintatico = true;
                    tabelaSimbolos[pos].erroSintatico = '';
                    verificaFor(tabelaSimbolos);
                break;

                case 't_while':
                    tabelaSimbolos[pos].statusSintatico = true;
                    tabelaSimbolos[pos].erroSintatico = '';
                    verificaWhile(tabelaSimbolos);
                break;

                case 't_id': //expressões(instruções)
                    tabelaSimbolos[pos].statusSintatico = true;
                    tabelaSimbolos[pos].erroSintatico = '';
                    verificaExpressao(tabelaSimbolos);
                break;

                //tipos_especificos (ERRO)
                case 't_integer':
                    tabelaSimbolos[pos].statusSintatico = false;
                    tabelaSimbolos[pos].erroSintatico = 'Declaração de variáveis apenas no início ';
                break;

                case 't_float':
                    tabelaSimbolos[pos].statusSintatico = false;
                    tabelaSimbolos[pos].erroSintatico = 'Declaração de variáveis apenas no início ';
                break;

                case 't_string':
                    tabelaSimbolos[pos].statusSintatico = false;
                    tabelaSimbolos[pos].erroSintatico = 'Declaração de variáveis apenas no início ';
                break;

                case 't_expoente':
                    tabelaSimbolos[pos].statusSintatico = false;
                    tabelaSimbolos[pos].erroSintatico = 'Declaração de variáveis apenas no início ';
                break;

                default: //arrumar isso
                    tabelaSimbolos[pos].statusSintatico = false;
                    tabelaSimbolos[pos].erroSintatico = `'Deixa eu ver qq acontece !' token =  ${tabelaSimbolos[pos].token} linha = ${tabelaSimbolos[pos].linha}`;
                break;
            }
            pos = pos + 1;
        }

        return tabelaSimbolos;
    }

    //função verificadora do instâncias de váriaveis (chico, chicao, chicos, chicox)
    function verificaInstanciaVar(tabelaSimbolos) {
        //console.log(tabelaSimbolos[pos]);
        //t_id
        pos = pos + 1;

        if(TAM(tabelaSimbolos)) {
            //console.log(tabelaSimbolos[pos].token);
            if( tabelaSimbolos[pos].token != 't_id') {
                tabelaSimbolos[pos].statusSintatico = false;
                tabelaSimbolos[pos].erroSintatico = 'Depois de "chico" espera-se um identificador';
            } else {
                tabelaSimbolos[pos].statusSintatico = true;
                tabelaSimbolos[pos].erroSintatico = '';
            }
            //console.log(tabelaSimbolos[pos]);
        }
        

        //t_atr '='
        pos = pos + 1;
        if(TAM(tabelaSimbolos)) {
            //console.log(tabelaSimbolos[pos].token);
            if(tabelaSimbolos[pos].token != 't_atri') {
                tabelaSimbolos[pos].statusSintatico = false;
                tabelaSimbolos[pos].erroSintatico = 'Inicialize as variáveis espera-se "="';
            } else {
                tabelaSimbolos[pos].statusSintatico = true;
                tabelaSimbolos[pos].erroSintatico = '';
            }
            //console.log(tabelaSimbolos[pos]);
        }

        //t_num
        pos = pos + 1;
        if(TAM(tabelaSimbolos)) {    
            //console.log(tabelaSimbolos[pos].token);
            if(tabelaSimbolos[pos].token != 't_num') {
                tabelaSimbolos[pos].statusSintatico = false;
                tabelaSimbolos[pos].erroSintatico = 'Depois de "identificador" espera-se um número ou string'; 
            } else {
                tabelaSimbolos[pos].statusSintatico = true;
                tabelaSimbolos[pos].erroSintatico = '';
            }
            //console.log(tabelaSimbolos[pos]);
        }
    }

    //função verificadora do if (taestudando?)
    function verificaIf(tabelaSimbolos) {
        //t_aparenteses '('
        pos = pos + 1;
        if(TAM(tabelaSimbolos)) {    
            console.log(tabelaSimbolos[pos].token);
            if(tabelaSimbolos[pos].token != 't_aparenteses') {
                tabelaSimbolos[pos].statusSintatico = false;
                tabelaSimbolos[pos].erroSintatico = 'Depois de "taestudando? " espera-se um "("'; 
            } else {
                tabelaSimbolos[pos].statusSintatico = true;
                tabelaSimbolos[pos].erroSintatico = '';
            }
            console.log(tabelaSimbolos[pos]);
        }

        //t_num | t_id
        pos = pos + 1;
        if(TAM(tabelaSimbolos)) {    
            console.log(tabelaSimbolos[pos].token);
            if(tabelaSimbolos[pos].token != 't_num' && tabelaSimbolos[pos].token != 't_id') {
                tabelaSimbolos[pos].statusSintatico = false;
                tabelaSimbolos[pos].erroSintatico = 'Depois de "( " espera-se um "identificador" ou "número"'; 
            } else {
                tabelaSimbolos[pos].statusSintatico = true;
                tabelaSimbolos[pos].erroSintatico = '';
            }
            console.log(tabelaSimbolos[pos]);
        }

        //t_comp | t_maior | t_menor | t_maiorI | t_menorI
        pos = pos + 1;
        if(TAM(tabelaSimbolos)) {    
            console.log(tabelaSimbolos[pos].token);
            if(tabelaSimbolos[pos].token != 't_comp' && 
                tabelaSimbolos[pos].token != 't_maior' &&
                tabelaSimbolos[pos].token != 't_menor' && 
                tabelaSimbolos[pos].token != 't_maiorI' &&
                tabelaSimbolos[pos].token != 't_menorI' &&
                tabelaSimbolos[pos].token != 't_dif') {

                tabelaSimbolos[pos].statusSintatico = false;
                tabelaSimbolos[pos].erroSintatico = 'Depois de "identificador/número" espera-se um op. de comparação "==,>,<,>=,<="'; 
            } else {
                tabelaSimbolos[pos].statusSintatico = true;
                tabelaSimbolos[pos].erroSintatico = '';
            }
            console.log(tabelaSimbolos[pos]);
        }

        //t_num | t_id
        pos = pos + 1;
        if(TAM(tabelaSimbolos)) {    
            console.log(tabelaSimbolos[pos].token);
            if(tabelaSimbolos[pos].token != 't_num' && tabelaSimbolos[pos].token != 't_id') {
                tabelaSimbolos[pos].statusSintatico = false;
                tabelaSimbolos[pos].erroSintatico = 'Depois de "op. de comparação" espera-se um "identificador" ou "número"'; 
            } else {
                tabelaSimbolos[pos].statusSintatico = true;
                tabelaSimbolos[pos].erroSintatico = '';
            }
            console.log(tabelaSimbolos[pos]);
        }

        //t_fparenteses ')'
        pos = pos + 1;
        if(TAM(tabelaSimbolos)) {    
            console.log(tabelaSimbolos[pos].token);
            if(tabelaSimbolos[pos].token != 't_fparenteses') {
                tabelaSimbolos[pos].statusSintatico = false;
                tabelaSimbolos[pos].erroSintatico = 'Depois de "identificador/número" espera-se um ")"'; 
            } else {
                tabelaSimbolos[pos].statusSintatico = true;
                tabelaSimbolos[pos].erroSintatico = '';
            }
            console.log(tabelaSimbolos[pos]);
        }

        //t_achave '{'
        pos = pos + 1;
        if(TAM(tabelaSimbolos)) {    
            console.log(tabelaSimbolos[pos].token);
            if(tabelaSimbolos[pos].token != 't_achave') {
                tabelaSimbolos[pos].statusSintatico = false;
                tabelaSimbolos[pos].erroSintatico = 'Depois de "(" espera-se um "{"'; 
            } else {
                tabelaSimbolos[pos].statusSintatico = true;
                tabelaSimbolos[pos].erroSintatico = '';
            }
            console.log(tabelaSimbolos[pos]);
        }
    }

    //função verificadora do while (enquantonaoestudar)
    function verificaWhile(tabelaSimbolos) {
        
    }

    //função verificadora do for (atelerlivros)
    function verificaFor(tabelaSimbolos) {
        
    }

    //função verificadora de expressões
    function verificaExpressao(tabelaSimbolos) {
       
    }

    //função verificadora do fim de programa


    //verificando se ainda existe código a ser válidado
    function TAM(tabelaSimbolos) {
        console.log('here pos = ' + pos + ' < ' + tabelaSimbolos.length);
        return pos < tabelaSimbolos.length;
    }

    return this;
}