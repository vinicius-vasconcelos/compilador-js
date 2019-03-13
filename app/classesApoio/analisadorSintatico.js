module.exports = function(application) {
    pos = 0;
    cadeiaAtual;

    this.analisadorSintatico = (tabelaSimbolos) => {
        cadeiaAtual = tabelaSimbolos[pos].token;
        inicioProgram();
    }

    //função verificadora do inicio de programa
    function inicioProgram() {
        if(cadeiaAtual == 't_inicio')
            cadeiaAtual[pos].statusSintatico = true;
        else
            cadeiaAtual[pos].statusSintatico = false;

        //chamar o próximo token
        pos++;
        switch(cadeiaAtual[pos]) {
            case ''
        }

    }

    //função verificadora do instâncias de váriaveis (chico, chicao, chicos, chicox)

    //função verificadora do if (taestudando?)

    //função verificadora do if com else (vish)

    //função verificadora do while (enquantonaoestudar)

    //função verificadora do for (atelerlivros)

    //função verificadora de expressões

    //função verificadora do fim de programa

    return this;
}