package com.example.erectus;

public class AtividadeFisica {

    private int id;
    private String nome;
    private String categoria;
    private String descricao;
    private String url_midia;

    // Construtor vazio padrão
    public AtividadeFisica() {
    }

    // Getters e Setters manuais
    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCategoria() {
        return this.categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getUrl_midia() {
        return this.url_midia;
    }

    public void setUrl_midia(String url_midia) {
        this.url_midia = url_midia;
    }
}