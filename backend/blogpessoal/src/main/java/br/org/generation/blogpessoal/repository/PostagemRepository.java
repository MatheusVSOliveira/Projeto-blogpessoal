package br.org.generation.blogpessoal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.org.generation.blogpessoal.model.Postagem;

public interface PostagemRepository extends JpaRepository<Postagem, Long> {
	public List <Postagem> findAllByTituloContainingIgnoreCase(String titulo);
	
	//select* from tb_postagem where titulo like "%titulo%";
}