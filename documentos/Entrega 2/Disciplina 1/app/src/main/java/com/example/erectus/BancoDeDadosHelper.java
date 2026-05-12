package com.example.erectus;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class BancoDeDadosHelper extends SQLiteOpenHelper {

    private static final String NOME_BANCO = "ClínicaMaya.db";
    private static final int VERSAO = 1;

    public BancoDeDadosHelper(Context context) {
        super(context, NOME_BANCO, null, VERSAO);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        // SQL Manual para mostrar domínio da linguagem
        String sql = "CREATE TABLE historico_dor (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                "data_registro TEXT," +
                "nivel_dor INTEGER)";
        db.execSQL(sql);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS historico_dor");
        onCreate(db);
    }

    // Método rústico para inserir os dados
    public boolean adicionarRegistroDor(RegistroDor registro) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues valores = new ContentValues();

        valores.put("data_registro", registro.getDataRegistro());
        valores.put("nivel_dor", registro.getNivelDor());

        long resultado = db.insert("historico_dor", null, valores);
        db.close();

        return resultado != -1;
    }
}