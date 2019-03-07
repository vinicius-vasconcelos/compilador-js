module.exports = function (application) {

    //função de operadores da linguagem
    this.operadores = () => {
        return op = {
            t_atri: '=',
            t_comp: '==',
            t_add: '+',
            t_sub: '-',
            t_mul: '*',
            t_div: '/',
            t_maior: '>',
            t_menor: '<',
            t_and: '&&',
            t_or: '||',
            t_add2: '++',
            t_sub2: '--'
        }
    }

    //função de tipos da linguagem
    this.tipos = () => {
        return tipo = {
            t_integer: 'chico',
            t_float: 'chicao',
            t_string: 'chicos'
        }
    }

    //função de estruturas de controle da linguagem
    this.est_controle = () => {
        return estControle = {
            t_if: 'taestudando',
            t_else: 'vish'
        }
    }

    //função de estruturas de repetição da linguagem
    this.est_repeticao = () => {
        return estRepeticao = {
            t_for: 'atelerlivros',
            t_while: 'enquantonaoestudar'
        }
    }

    this.extras = () => {
        return extra = {
            t_void: 'vazio',
            t_main: 'man',
            t_inicio: 'chicoman',
            t_fim: 'chicoend'
        }
    }

    return this;
}