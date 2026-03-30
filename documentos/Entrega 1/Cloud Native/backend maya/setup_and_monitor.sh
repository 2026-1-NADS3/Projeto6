#!/bin/bash

# Função para simular o setup do ambiente no Windows
setup_environment() {
  echo "Iniciando setup do ambiente no Windows..."

  # Instalar Java (exemplo: verificar se o Java está instalado)
  echo "Verificando instalação do Java..."
  java -version 2>/dev/null || echo "Java não encontrado. Instale manualmente do site oficial: https://www.java.com/"

  # Instalar Android SDK (exemplo: instrução para instalação manual)
  echo "Para instalar o Android SDK, baixe e instale manualmente do site oficial: https://developer.android.com/studio"

  # Instalar ferramentas de build (exemplo: instrução para instalação manual)
  echo "Para instalar ferramentas de build no Windows, use o Visual Studio Build Tools: https://visualstudio.microsoft.com/visual-cpp-build-tools/"

  echo "Setup do ambiente concluído! Certifique-se de instalar as dependências manualmente."
}

# Função para monitorar o sistema no Windows
monitor_system() {
  echo "Iniciando monitoramento do sistema no Windows..."

  # Coletar uso de CPU
  echo "Uso de CPU:"
  wmic cpu get loadpercentage

  # Coletar uso de memória
  echo "Uso de Memória:"
  wmic OS get FreePhysicalMemory,TotalVisibleMemorySize /Value

  # Coletar uso de disco
  echo "Uso de Disco:"
  wmic logicaldisk get size,freespace,caption

  echo "Monitoramento concluído!"
}

# Menu para o usuário
echo "Escolha uma opção:"
echo "1. Setup do ambiente"
echo "2. Monitoramento do sistema"
read -p "Digite sua escolha (1 ou 2): " choice

case $choice in
  1)
    setup_environment
    ;;
  2)
    monitor_system
    ;;
  *)
    echo "Opção inválida!"
    ;;
esac