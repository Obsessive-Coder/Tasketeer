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
	private final String[] tasks = {
		"Learn Java fundamentals",
		"Learn Spring Boot",
		"Learn Postgres",
		"Make a React, Spring Boot, and Postgres app",
		"Get a dev job",
		"Obsessively code all night, everyday"
	};

	@Autowired
	public DatabaseLoader(TaskRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		for(int i = 0; i < this.tasks.length; i ++) {
			this.repository.save(new Task(tasks[i]));
		}	
	}
}