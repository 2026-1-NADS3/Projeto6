package com.example.erectus;

public class AtividadeFisica {

    private int id;
    private String nome;
    private String descricao;
    private int calorias;       // Para o nosso contador numérico!
    private int series;         // Ex: 3 séries
    private int repeticoes;     // Ex: 15 repetições
    private String urlImagem;   // Para carregar uma foto do movimento depois

    // Construtor vazio
    public AtividadeFisica() {
    }

    // Métodos Getters e Setters manuais e explícitos
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

    public String getDescricao() {
        return this.descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public int getCalorias() {
        return this.calorias;
    }

    public void setCalorias(int calorias) {
        this.calorias = calorias;
    }

    public int getSeries() {
        return this.series;
    }

    public void setSeries(int series) {
        this.series = series;
    }

    public int getRepeticoes() {
        return this.repeticoes;
    }

    public void setRepeticoes(int repeticoes) {
        this.repeticoes = repeticoes;
    }

    public String getUrlImagem() {
        return this.urlImagem;
    }

    public void setUrlImagem(String urlImagem) {
        this.urlImagem = urlImagem;
    }
}