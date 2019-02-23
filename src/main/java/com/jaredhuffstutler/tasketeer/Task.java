package com.jaredhuffstutler.tasketeer;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Version;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Jared Huffstutler
 */
@Data
@Entity
public class Task {
	private @Id @GeneratedValue Long id;
    private String description;
    private Boolean isComplete;

    private @Version @JsonIgnore Long version;

	private Task() {}

	public Task(String description) {
        this.description = description;
        this.isComplete = false;
	}
}