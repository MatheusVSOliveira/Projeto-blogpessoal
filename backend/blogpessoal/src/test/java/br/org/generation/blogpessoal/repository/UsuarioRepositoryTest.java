package br.org.generation.blogpessoal.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

import br.org.generation.blogpessoal.model.Usuario;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UsuarioRepositoryTest
{
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@BeforeAll
	void start( ) 
	{
		Usuario usuario = new Usuario(0,"Matheus da Silva","matheus@email.com","12345678");
		if(!usuarioRepository.findByUsuario(usuario.getUsuario()).isPresent())
			usuarioRepository.save(usuario);
		
		usuario = new Usuario(0,"Maria da Silva","maria@email.com","12345678");
		if(!usuarioRepository.findByUsuario(usuario.getUsuario()).isPresent())
			usuarioRepository.save(usuario);
		
		usuario = new Usuario(0,"Mario da Silva","mario@email.com","12345678");
		if(!usuarioRepository.findByUsuario(usuario.getUsuario()).isPresent())
			usuarioRepository.save(usuario);
		
		usuario = new Usuario(0,"Eduardo Oliveira","eduardo@email.com","987654321");
		if(!usuarioRepository.findByUsuario(usuario.getUsuario()).isPresent())
			usuarioRepository.save(usuario);
	}
	
	//Testa o método findByNome()
	@Test
	@DisplayName("💾 Retorna o nome")
	public void findByNomeRetornaNome() throws Exception 
	{
		Usuario usuario = usuarioRepository.findByNome("Matheus da Silva");
		assertTrue(usuario.getNome().equals("Matheus da Silva"));
	}
	
	//Testa o método FindAllByNomeContainingIgnoreCase()
	@Test
	@DisplayName("💾 Retorna 3 usuarios")
	public void FindAllByNomeContainingIgnoreCaseRetornaTresUsuarios() 
	{
		List <Usuario> listaDeUsuarios = usuarioRepository.findAllByNomeContainingIgnoreCase("Silva");
		assertEquals(3, listaDeUsuarios.size());
	}
	
	@AfterAll
	public void end() 
	{
		usuarioRepository.deleteAll();
	}

}

