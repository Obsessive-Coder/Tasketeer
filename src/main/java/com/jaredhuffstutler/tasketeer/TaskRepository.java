package com.jaredhuffstutler.tasketeer;

import org.springframework.data.repository.CrudRepository;

/**
 * @author Jared Huffstutler
 */
public interface TaskRepository extends CrudRepository<Task, Long> {}