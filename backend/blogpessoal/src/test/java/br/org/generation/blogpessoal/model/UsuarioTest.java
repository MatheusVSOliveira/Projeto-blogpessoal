package br.org.generation.blogpessoal.model;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT) // RANDOM_PORT não precisa se preocupar em configurar a porta onde o teste vai rodar
public class UsuarioTest 
{
	public Usuario usuario;
	public Usuario usuarioErro = new Usuario();
	
	private ValidatorFactory factory = Validation.buildDefaultValidatorFactory(); //Verifica se as anotações passadas são correspondentes 
	Validator validator = factory.getValidator(); // verifica se as validações estão sendo correspondidas no objeto.
	
	@BeforeEach
	public void start() 
	{
		usuario = new Usuario(0L, "João da Silva", "joao@email.com", "12345678");
	}
	
	@Test
	@DisplayName("✔ Valida Atributos Não Nulos")
	void testValidaAtributos() 
	{

		Set<ConstraintViolation<Usuario>> violacao = validator.validate(usuario);
		
		System.out.println(violacao.toString());

		assertTrue(violacao.isEmpty());
	}
	
	@Test
	@DisplayName("✖ Não Valida Atributos Nulos")
	void testNaoValidaAtributos() 
	{
		Set<ConstraintViolation<Usuario>> violacao = validator.validate(usuarioErro);
		System.out.println(violacao.toString());
		
		assertFalse(violacao.isEmpty());
	}
	
}
