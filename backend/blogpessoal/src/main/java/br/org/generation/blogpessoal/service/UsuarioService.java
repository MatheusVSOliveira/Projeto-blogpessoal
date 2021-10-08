package br.org.generation.blogpessoal.service;

import java.nio.charset.Charset;
import java.util.List;
import java.util.Optional;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.org.generation.blogpessoal.model.Usuario;
import br.org.generation.blogpessoal.model.UsuarioLogin;
import br.org.generation.blogpessoal.repository.UsuarioRepository;

@Service
public class UsuarioService 
{
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public List <Usuario> listarUsuarios()
	{
		return usuarioRepository.findAll();
	}
	
	public Optional <Usuario> cadastrarUsuario(Usuario usuario) 
	{
		if(usuarioRepository.findByUsuario(usuario.getUsuario()).isPresent())
				return Optional.empty(); // o optional retorna vazio para informar que o usuário já existe no banco a controller, que mostrará um BAD_REQUEST.
		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		String senhaEncoder = encoder.encode(usuario.getSenha());
		
		usuario.setSenha(senhaEncoder);
		
		/* of​ - Retorna um Optional com o valor fornecido, mas o valor não pode ser nulo. 
		 * Se não tiver certeza de que o valor não é nulo use Optional.ofNullable.*/
		return Optional.of(usuarioRepository.save(usuario));
	}
	
	public Optional <UsuarioLogin> autenticarUsuario(Optional<UsuarioLogin> usuarioLogin) 
	{
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		/*get​ - Se um valor estiver presente retorna o valor, caso contrário, lança NoSuchElementException. 
		 * Então para usar get é preciso ter certeza de que o Optional não está vazio.*/
		Optional <Usuario> usuario = usuarioRepository.findByUsuario(usuarioLogin.get().getUsuario());
		
		if (usuario.isPresent()) 
		{
			if(encoder.matches(usuarioLogin.get().getSenha(), usuario.get().getSenha())) 
			{
				String auth = usuarioLogin.get().getUsuario() + ":" + usuarioLogin.get().getSenha(); //Concatena o usuário + : + senha
				byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII"))); //Charset Converter em código ASCII
				String authHeader = "Basic " + new String(encodedAuth); //Concatena o "Basic " + encodedAuth (token)
				
				//Cadastrando o usuario(banco de dados) no usuário login
				usuarioLogin.get().setId(usuario.get().getId());
				usuarioLogin.get().setNome(usuario.get().getNome());
				usuarioLogin.get().setSenha(usuario.get().getSenha());
				usuarioLogin.get().setToken(authHeader);
				
				return usuarioLogin;
			}
		}
		
		return Optional.empty();
	}
}
