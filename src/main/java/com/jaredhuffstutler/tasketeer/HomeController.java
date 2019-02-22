package com.jaredhuffstutler.tasketeer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Jared Huffstutler
 */
@Controller
public class HomeController {
	@RequestMapping(value = "/")
	public String index() {
		return "index";
	}
}