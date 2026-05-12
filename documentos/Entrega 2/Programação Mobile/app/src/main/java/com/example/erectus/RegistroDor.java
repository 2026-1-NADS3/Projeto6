package com.example.erectus;

public class RegistroDor {

    private int id;
    private String dataRegistro;
    private int nivelDor;

    // Construtor padrão
    public RegistroDor() {
    }

    // Getters e Setters manuais e detalhados
    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDataRegistro() {
        return this.dataRegistro;
    }

    public void setDataRegistro(String dataRegistro) {
        this.dataRegistro = dataRegistro;
    }

    public int getNivelDor() {
        return this.nivelDor;
    }

    public void setNivelDor(int nivelDor) {
        this.nivelDor = nivelDor;
    }
}