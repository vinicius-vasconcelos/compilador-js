/*
    *** "analisadorSintatico" chama o "vefificaInicio"
    *** verifica inicio é responsável por "chicoman" e instâncias de variáveis
            quando encontrado estrutura de controle ou repetição é chamado o "verificaCorpo"
    *** "verificaCorpo" verfica estruturas de repetição,controle e expressões
    *** NÃO É PERMITIDA A DECLARAÇÃO OU INSTÂNCIA DE VARIÁVEIS NO CORPO DO PROGRAMA !!!
*/

module.exports = function(application) { 
    let pos;
    let empilhaChaves;
    let empilhaIf;
    let empilhaBora;
    let acabou;
    let flag;

    this.analisadorSintatico = tabelaSimbolos => {
        return new Promise(async (resolve, reject) => {
            pos = 0;
            acabou = false;
            empilhaChaves = new Array;
            empilhaIf = new Array;
            empilhaBora = new Array;
            flag = false;
            resolve(await verificaInicio(tabelaSimbolos));
        });
    }

    //função verificadora do inicio de programa (Feito)
    function verificaInicio(tabelaSimbolos) {
        let init = false;

        if(pos < tabelaSimbolos.length)
            if(tabelaSimbolos[pos].token == 't_inicio') {
                init = true;
                gravaMsgSintatico(true, tabelaSimbolos, pos, '');
            }
            else {
                init = false
                gravaMsgSintatico(false, tabelaSimbolos, pos, 'Código deve-se iniciar com "chicoman "');
            }

        pos = pos + 1;
        while(pos < tabelaSimbolos.length) {
            //chamar o próximo token
            switch(tabelaSimbolos[pos].token) {
                //tipos_especificos (insâncias de variáveis)
                case 't_integer':
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
                    verificaInstanciaVar(tabelaSimbolos);
                break;

                case 't_float':
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
                    verificaInstanciaVar(tabelaSimbolos);
                break;

                case 't_string':
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
                    verificaInstanciaVar(tabelaSimbolos);
                break;

                case 't_expoente':
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
                    verificaInstanciaVar(tabelaSimbolos);
                break;

                //ou (taestudando?|enquantonaoestudar|atelerlivros|expressao)
                case 't_if':
                    verificaCorpo(tabelaSimbolos);
                break;

                case 't_else':
                    verificaCorpo(tabelaSimbolos);
                break;

                case 't_fchave': //possivelmente terá um else ou "{" associado a ele
                    verificaCorpo(tabelaSimbolos);
                break;

                case 't_do':
                    verificaCorpo(tabelaSimbolos);
                break;

                case 't_while2':
                    verificaCorpo(tabelaSimbolos);
                break;

                case 't_while':
                    verificaCorpo(tabelaSimbolos);
                break;

                case 't_id':
                    verificaCorpo(tabelaSimbolos);
                break;

                case 't_fim':
                    acabou = true;
                    verificaFim(tabelaSimbolos);
                break;

                default: //verficar (, )
                    gravaMsgSintatico(false, tabelaSimbolos, pos, `token "${tabelaSimbolos[pos].cadeia}" em posição incorreta`);
                break;
            }
            pos = pos + 1;
        }

        if(!acabou && init) {
            if(tabelaSimbolos.length != 1)
                pos = pos - 2;
            else
                pos = pos - 1;
            gravaMsgSintatico(false, tabelaSimbolos, pos, 'Espera-se "chicoend" como finalização de programa e construção de "estruturas" corretas');
        }

        if(empilhaChaves.length > 0)
            gravaMsgSintatico(false, tabelaSimbolos, empilhaChaves.pop(), 'chave aberta e não fechada');

        if(empilhaBora.length > 0)
            gravaMsgSintatico(false, tabelaSimbolos, empilhaBora.pop(), '"boraestudar?" espera um "estudando"');
        
        return tabelaSimbolos;
    }

    //função para verificar resto do código exceto instancias de váriaveis
    function verificaCorpo(tabelaSimbolos) {

        while(pos < tabelaSimbolos.length) {
            //chamar o próximo token
            switch(tabelaSimbolos[pos].token) {

                //Estruturar de controle, repetição ou expressões
                case 't_if':
                    empilhaIf.push(pos);
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
                    verificaIf(tabelaSimbolos);
                break;

                case 't_fchave': //possivelmente terá um else ou "{" associado a ele
                    if(empilhaChaves.length != 0) { 
                        empilhaChaves.pop();
                        gravaMsgSintatico(true, tabelaSimbolos, pos, '');
                    }
                    else
                        gravaMsgSintatico(false, tabelaSimbolos, pos, 'Nenhum "{" associado a este "}');
                break;

                case 't_else':
                if(empilhaIf.length != 0) {
                    empilhaIf.pop()
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
                    verificaElse(tabelaSimbolos);
                }
                else
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Todo "vish" prevê um "taestudando?"');
                break;

                case 't_do':
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
                    empilhaBora.push(pos);
                break;

                case 't_while2':
                if(empilhaBora.length != 0) {
                    empilhaBora.pop()
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
                    verificaEstudando(tabelaSimbolos);
                }
                else
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Todo "estudando" prevê um "boraestudar?"');
                    
                break;

                case 't_while':
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
                    verificaWhile(tabelaSimbolos);
                break;

                case 't_id': //expressões(instruções)
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
                    verificaExpressao(tabelaSimbolos);
                break;

                case 't_fim':
                    acabou = true;
                    verificaFim(tabelaSimbolos);
                break;

                //tipos_especificos (ERRO)
                case 't_integer':
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Declaração de variáveis apenas no início do programa');
                break;

                case 't_float':
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Declaração de variáveis apenas no início do programa');
                break;

                case 't_string':
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Declaração de variáveis apenas no início do programa');
                break;

                case 't_expoente':
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Declaração de variáveis apenas no início do programa');
                break;

                default: //arrumar isso ******
                    gravaMsgSintatico(false, tabelaSimbolos, pos, `token "${tabelaSimbolos[pos].cadeia}" em posição incorreta`);
                break;
            }
            pos = pos + 1;
        }
    }

    //função verificadora do instâncias de váriaveis (chico, chicao, chicos, chicox)
    function verificaInstanciaVar(tabelaSimbolos) {
        //captura linha da análise
        if(pos < tabelaSimbolos.length) {
            let codLinha = tabelaSimbolos[pos].linha;
            flag = true;

            //t_id
            pos = pos + 1;
            if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
                if( tabelaSimbolos[pos].token != 't_id')
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "chico/chicao/chicox" espera-se um identificador'); 
                else
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "chico" espera-se um identificador');
                    flag = false;
                }
            } 

            //t_atr '='
            pos = pos + 1;
            if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
                if(tabelaSimbolos[pos].token != 't_atri') 
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "identificador" espera-se "="');
                else
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "identificador" espera-se "="');
                    flag = false;
                }
            } 

            //t_num ou t_id ou t_str
            pos = pos + 1;
            if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
                if(tabelaSimbolos[pos].token != 't_num' && 
                    tabelaSimbolos[pos].token != 't_id' && 
                    tabelaSimbolos[pos].token != 't_str')
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de uma "atribuição" espera-se um número ou string');  
                else
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de uma "atribuição" espera-se um número ou string');
                    flag = false;
                }
            }

            //t_ptv
            pos = pos + 1;
            if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
                if(tabelaSimbolos[pos].token != 't_ptv')
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de um "número/string" espera-se um ";"');
                else
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de um "número/string" espera-se um ";"');
                    flag = false;
                }
            }
        }
    }

    //função verificadora do if (taestudando?)
    function verificaIf(tabelaSimbolos) {
        //captura linha da análise
        if(pos < tabelaSimbolos.length) {
            let codLinha = tabelaSimbolos[pos].linha;
            flag = true;

           //t_aparenteses '('
            pos = pos + 1;
            if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
                if(tabelaSimbolos[pos].token != 't_aparenteses')
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "taestudando? " espera-se um "("');
                else
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
            }
            else {
                
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "taestudando? " espera-se um "("');
                    flag = false;
                }
            }

            verificaComparacoes(tabelaSimbolos, codLinha); //função para ver (t_id/t_num op.comp. t_id/t_num)

            //t_fparenteses ')'
            pos = pos + 1;
            if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
                if(tabelaSimbolos[pos].token != 't_fparenteses')
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "identificador/número" espera-se um ")"');
                else
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "identificador/número" espera-se um ")"');
                    flag = false;
                }
            }

            //t_achave '{'
            pos = pos + 1;
            if(pos < tabelaSimbolos.length) {
                if(tabelaSimbolos[pos].token != 't_achave') 
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "(" espera-se um "{"');
                else {
                    empilhaChaves.push(pos);
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
                }
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "(" espera-se um "{"');
                    flag = false;
                } 
            }
        }
    }

   //função verificadora do else (vish) (FEITO)
    function verificaElse(tabelaSimbolos) {
        
        //if montado corretamente, agora verificar o else
        if(tabelaSimbolos[pos-1].token == 't_fchave') {
            flag = true;
            //t_achave '{'
            pos = pos + 1;
            if(pos < tabelaSimbolos.length ) {
                
                if(tabelaSimbolos[pos].token != 't_achave') 
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "vish" espera-se um "{"');
                else {
                    empilhaChaves.push(pos);
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
                }
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "vish" espera-se um "{"');
                    flag = false;
                } 
            }
        }
        else { //não existe um if antes do else
            gravaMsgSintatico(false, tabelaSimbolos, pos, 'um "vish" prevê antes um "taestudando?"');
        }
    }

    //função verificadora do while (enquantonaoestudar)
    function verificaWhile(tabelaSimbolos) {

        //captura linha da análise
        if(pos < tabelaSimbolos.length) {
            let codLinha = tabelaSimbolos[pos].linha;
            flag = true;

           //t_aparenteses '('
            pos = pos + 1;
            if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
                if(tabelaSimbolos[pos].token != 't_aparenteses')
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "enquantonaoestudar" espera-se um "("');
                else
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "enquantonaoestudar" espera-se um "("');
                    flag = false;
                }
            }

            verificaComparacoes(tabelaSimbolos, codLinha); //função para ver (t_id/t_num op.comp. t_id/t_num); 

            //t_fparenteses ')'
            pos = pos + 1;
            if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
                if(tabelaSimbolos[pos].token != 't_fparenteses')
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "identificador/número" espera-se um ")"');
                else
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "identificador/número" espera-se um ")"');
                    flag = false;
                }
            }

            //t_achave '{'
            pos = pos + 1;
            if(pos < tabelaSimbolos.length) {
                if(tabelaSimbolos[pos].token != 't_achave') 
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de ")" espera-se um "{"');
                else {
                    empilhaChaves.push(pos);
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
                }
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de ")" espera-se um "{"');
                    flag = false;
                } 
            }
        }        
    }

    //função para comparações (==, <, >, <=, >=, !=)
    function verificaComparacoes(tabelaSimbolos, codLinha) {
        //t_num | t_id
        pos = pos + 1;
        if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
            if(tabelaSimbolos[pos].token != 't_num' && tabelaSimbolos[pos].token != 't_id') 
                gravaMsgSintatico(false, tabelaSimbolos, pos,'Depois de "(" espera-se um "identificador" ou "número"');
            else
                gravaMsgSintatico(true, tabelaSimbolos, pos, '');
        }
        else {
            pos = pos - 1;
            if(flag) {
                gravaMsgSintatico(false, tabelaSimbolos, pos,`Depois de "${tabelaSimbolos[pos].cadeia}" espera-se um "identificador" ou "número"`);
                flag = false;
            }
        }

        //t_comp | t_maior | t_menor | t_maiorI | t_menorI
        pos = pos + 1;
        if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
            if(tabelaSimbolos[pos].token != 't_comp' && 
            tabelaSimbolos[pos].token != 't_maior' &&
            tabelaSimbolos[pos].token != 't_menor' && 
            tabelaSimbolos[pos].token != 't_maiorI' &&
            tabelaSimbolos[pos].token != 't_menorI' &&
            tabelaSimbolos[pos].token != 't_dif')
                gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "identificador/número" espera-se um op. de comparação "==, >, <, >=, <=, !="');
            else
                gravaMsgSintatico(true, tabelaSimbolos, pos, '');
        }
        else {
            pos = pos - 1;
            if(flag) {
                gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "identificador/número" espera-se um op. de comparação "==, >, <, >=, <=, !="');
                flag = false;
            }
        }

        //t_num | t_id
        pos = pos + 1;
        if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
            if(tabelaSimbolos[pos].token != 't_num' && tabelaSimbolos[pos].token != 't_id')
                gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "op. de comparação" espera-se um "identificador/número"');
            else
                gravaMsgSintatico(true, tabelaSimbolos, pos, '');
        }
        else {
            pos = pos - 1;
            if(flag) {
                gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "op. de comparação" espera-se um "identificador/número"');
                flag = false;
            }
        }

        //verficando operador lógico
        /*pos = pos + 1;
        if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
            if(tabelaSimbolos[pos].token == 't_and' || tabelaSimbolos[pos].token == 't_or') {
                gravaMsgSintatico(true, tabelaSimbolos, pos, '');
                verificaComparacoes(tabelaSimbolos);
            }
        }*/

    }

    //função verificadora de expressões
    function verificaExpressao(tabelaSimbolos) {
        //captura linha da análise
        if(pos < tabelaSimbolos.length) {
            let codLinha = tabelaSimbolos[pos].linha;
            flag = true;

            //t_atr '='
            pos = pos + 1;
            if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
                if(tabelaSimbolos[pos].token != 't_atri') 
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "identificador" espera-se "="');
                else
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "identificador" espera-se "="');
                    flag = false;
                }
            } 

            //t_id ou t_num
            pos = pos + 1;
            if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
                if( tabelaSimbolos[pos].token != 't_id' && tabelaSimbolos[pos].token != 't_num')
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de uma "=" espera-se um identificador ou numero'); 
                else
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de uma "=" espera-se um identificador ou numero');
                    flag = false;
                }
            }
            
            //t_ptv ou operador aritimético (+, -, *, /)
            pos = pos + 1;
            if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
                if(tabelaSimbolos[pos].token != 't_ptv' &&
                    tabelaSimbolos[pos].token != 't_add' &&
                    tabelaSimbolos[pos].token != 't_sub' &&
                    tabelaSimbolos[pos].token != 't_mul' &&
                    tabelaSimbolos[pos].token != 't_div')
                        gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de um "número/string" espera-se um ";"');
                else
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');

                if(tabelaSimbolos[pos].token == 't_ptv')
                    return;
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de um "número/string" espera-se um ";"');
                    flag = false;
                }
            }

            //t_id ou t_num
            pos = pos + 1;
            if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
                if( tabelaSimbolos[pos].token != 't_id' && tabelaSimbolos[pos].token != 't_num')
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de uma "=" espera-se um identificador ou numero'); 
                else
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de uma "=" espera-se um identificador ou numero');
                    flag = false;
                }
            }

            //t_ptv
            pos = pos + 1;
            if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
                if(tabelaSimbolos[pos].token != 't_ptv')
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de um "número/string" espera-se um ";"');
                else
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de um "número/string" espera-se um ";"');
                    flag = false;
                }
            }

        }
    }

    //função verificadora do fim de programa
    function verificaFim(tabelaSimbolos) {

        //verficando o fim de programa "chicoend"
        gravaMsgSintatico(true, tabelaSimbolos, pos, '');
        
        //fim de programa (daqui para baixo será desconsiderado)
        pos = pos + 1;
        if((tabelaSimbolos.length - pos) > 0)
            gravaMsgSintatico(false, tabelaSimbolos, pos, `fim de programa na linha ${tabelaSimbolos[pos].linha}`);

        pos = tabelaSimbolos.length;   
    }

    //função para gravação de mensagens sintáticos (FEITO)
    function gravaMsgSintatico(status, tabelaSimbolos, pos, msg) {
        //não ocorreu erros no token
        if(status) {
            tabelaSimbolos[pos].statusSintatico = status;
            tabelaSimbolos[pos].erroSintatico = msg;
        }
        else { //deu bosta no token
            tabelaSimbolos[pos].statusSintatico = status;
            tabelaSimbolos[pos].erroSintatico = msg; 
        }
    }

    //função de do while (boraestudar? estudando)
    function verificaEstudando(tabelaSimbolos) {
        //captura linha da análise
        if(pos < tabelaSimbolos.length) {
            let codLinha = tabelaSimbolos[pos].linha;
            flag = true;

           //t_aparenteses '('
            pos = pos + 1;
            if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
                if(tabelaSimbolos[pos].token != 't_aparenteses')
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "estudando" espera-se um "("');
                else
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "estudando" espera-se um "("');
                    flag = false;
                }
            }

            verificaComparacoes(tabelaSimbolos, codLinha); //função para ver (t_id/t_num op.comp. t_id/t_num); 

            //t_fparenteses ')'
            pos = pos + 1;
            if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
                if(tabelaSimbolos[pos].token != 't_fparenteses')
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "identificador/número" espera-se um ")"');
                else
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de "identificador/número" espera-se um ")"');
                    flag = false;
                }
            }

            //t_ptv
            pos = pos + 1;
            if(pos < tabelaSimbolos.length && codLinha == tabelaSimbolos[pos].linha) {
                if(tabelaSimbolos[pos].token != 't_ptv')
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de um ")" espera-se um ";"');
                else
                    gravaMsgSintatico(true, tabelaSimbolos, pos, '');
            }
            else {
                pos = pos - 1;
                if(flag) {
                    gravaMsgSintatico(false, tabelaSimbolos, pos, 'Depois de um ")" espera-se um ";"');
                    flag = false;
                }
            }
        }
    }

    return this;
}