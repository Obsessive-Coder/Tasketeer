package com.jaredhuffstutler.tasketeer;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

/**
 * @author Jared Huffstutler
 */
@Data
@Entity
public class Task {
	private @Id @GeneratedValue Long id;
    private String description;
    private Boolean isComplete;

	private Task() {}

	public Task(String description) {
        this.description = description;
        this.isComplete = false;
	}
}