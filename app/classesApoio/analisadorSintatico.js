module.exports = function(application) {
    pos = -1;

    this.analisadorSintatico = (tabelaSimbolos) => {
        //console.log(tabelaSimbolos)
        verificaInicio(tabelaSimbolos);
    }

    //função verificadora do inicio de programa
    function verificaInicio(tabelaSimbolos) {
        ++pos;
        if(tabelaSimbolos[pos].token == 't_inicio') {
            tabelaSimbolos[pos].statusSintatico = true;
            tabelaSimbolos[pos].erroSintatico = '';
        }
        else {
            tabelaSimbolos[pos].statusSintatico = false;
            tabelaSimbolos[pos].erroSintatico = 'Código deve-se iniciar com "chicoman "';
        }

        do {
            //chamar o próximo token
            switch(tabelaSimbolos[++pos].token) {
                //tipos_especificos (insâncias de variáveis)
                case 't_integer':
                    verificaInstanciaVar(tabelaSimbolos);
                break;

                case 't_float':
                    verificaInstanciaVar(tabelaSimbolos);
                break;

                case 't_string':
                    verificaInstanciaVar(tabelaSimbolos);
                break;

                case 't_expoente':
                    verificaInstanciaVar(tabelaSimbolos);
                break;

                //ou programastaestudando? (taestudando?|enquantonaoestudar|atelerlivros|expressao)
                case 't_if':
                    verificaIf(tabelaSimbolos);
                break;

                case 't_for':
                    verificaFor(tabelaSimbolos);
                break;

                case 't_while':
                    verificaWhile(tabelaSimbolos);
                break;

                case 't_id':
                    verificaExpressao(tabelaSimbolos);
                break;

                //tokens inválidos ou especiais
                /*case 't_invalido':
                break;*/
            }

        }while(pos < tabelaSimbolos.length);

    }

    //função verificadora do instâncias de váriaveis (chico, chicao, chicos, chicox)
    function verificaInstanciaVar(tabelaSimbolos) {
        ++pos;
        if(tabelaSimbolos[pos].token == 't_id') {
            ++pos;
            if(tabelaSimbolos[pos].token == 't_atri') {
                ++pos;
                if(tabelaSimbolos[pos].token == 't_num') {
                    ++pos;
                    if(tabelaSimbolos[pos].token == 't_ptv') {
                        tabelaSimbolos[pos].statusSintatico = true;
                        tabelaSimbolos[pos].erroSintatico = '';
                    }
                    else { //t_ptv
                        tabelaSimbolos[pos].statusSintatico = false;
                        tabelaSimbolos[pos].erroSintatico = 'Instrução termina-se com ";"';
                    }
                } else { //t_num
                    tabelaSimbolos[pos].statusSintatico = false;
                    tabelaSimbolos[pos].erroSintatico = 'Inicialize as variáveis';
                }
            } else { //t_atr
                tabelaSimbolos[pos].statusSintatico = false;
                tabelaSimbolos[pos].erroSintatico = 'Inicialize as variáveis';
            } 
        } else { //t_id
            tabelaSimbolos[pos].statusSintatico = false;
            tabelaSimbolos[pos].erroSintatico = 'Depois de "chico " espera-se uma variável';
        }
        
    }

    //função verificadora do if (taestudando?)
    function verificaIf(tabelaSimbolos) {
        
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

    return this;
}