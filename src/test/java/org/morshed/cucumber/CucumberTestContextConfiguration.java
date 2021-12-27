package org.morshed.cucumber;

import io.cucumber.spring.CucumberContextConfiguration;
import org.morshed.JdieticsApp;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@SpringBootTest(classes = JdieticsApp.class)
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
