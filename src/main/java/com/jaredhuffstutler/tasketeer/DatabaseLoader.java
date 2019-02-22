package com.jaredhuffstutler.tasketeer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * @author Jared Huffstutler
 */
@Component
public class DatabaseLoader implements CommandLineRunner {
	private final TaskRepository repository;

	@Autowired
	public DatabaseLoader(TaskRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		this.repository.save(new Task("The first task EVERRR!!!"));
		this.repository.save(new Task("The second task"));
		this.repository.save(new Task("The third task"));
		this.repository.save(new Task("The fourth task"));
		this.repository.save(new Task("The fifth task"));
		this.repository.save(new Task("the sixth task"));
	}
}