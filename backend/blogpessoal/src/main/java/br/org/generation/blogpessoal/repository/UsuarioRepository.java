package br.org.generation.blogpessoal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.org.generation.blogpessoal.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>
{
	public Optional <Usuario> findByUsuario(String usuario); //Método que busca o usuário pelo e-mail
	
	//Método criado para a Sessão de testes 01
	public List <Usuario> findAllByNomeContainingIgnoreCase(String nome); //select * from tb_usuarios where nome like "%nome procurado%"
	
	//Método criado para a Sessão de testes 02
	public Usuario findByNome(String nome); // select * from tb_usuarios where nome = "nome procurado"
	
}
