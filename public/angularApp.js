// angularApp.js => Códigos do AngularJS
 
// Criamos um módulo Angular chamado listaContatos
var listaContatos = angular.module('listaContatos', []);
 
function mainController($scope, $http) {    
 
    // Quando acessar a página, carrega todos os contatos e envia para a view($scope)
    var refresh = function (){
        $http.get('/produtos')
            .success(function(data) {
                $scope.contatos = data;
                $scope.formContato = {};
                console.log("contatos: ", data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    refresh();
 
    // Quando clicar no botão Criar, envia informações para a API Node
    $scope.criarContato = function() {
        $http.post('/produtos', $scope.formContato)
            .success(function(data) {
                // Limpa o formulário para criação de outros contatos
                $scope.formContato = {};
                $scope.contatos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
 
    // Ao clicar no botão Remover, deleta o contato
    $scope.deletarContato = function(id) {
        $http.delete('/produtos' + id)
            .success(function(data) {
                $scope.contatos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
 
    // Ao clicar no botão Editar, edita o contato
    $scope.editarContato = function(id) {
        $http.get('/produtos' + id)
            .success(function(data) {
                $scope.formContato = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
 
    // Recebe o JSON do contato para edição e atualiza
    $scope.atualizarContato = function() {        
        $http.put('/api/contatos/' + $scope.formContato._id, $scope.formContato)
        .success( function(response){
            refresh();
        });
    };
 
}