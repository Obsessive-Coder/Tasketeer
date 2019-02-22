package com.jaredhuffstutler.tasketeer;

import org.springframework.data.repository.PagingAndSortingRepository;;

/**
 * @author Jared Huffstutler
 */
public interface TaskRepository extends PagingAndSortingRepository<Task, Long> {}