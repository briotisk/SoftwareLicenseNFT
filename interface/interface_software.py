import tkinter as tk
from tkinter import messagebox

# Lista de códigos aceitáveis
codigo = "0xc693279643b8cd5d248172d9c22cb7cf4ed163a3c98c8a3f69c2717edd3eacb7"

# Função chamada quando o botão é pressionado
def verificar_codigo():
    codigo_digitado = entry.get()

    if codigo_digitado == codigo:
        messagebox.showinfo('Sucesso', 'Código válido! Acesso ao MathGenius Pro permitido...')
    else:
        messagebox.showerror('Erro', 'Código inválido. Tente novamente.')

# Criar a janela principal
root = tk.Tk()
root.title('MathGenius Pro')
root.geometry('300x150')

# Rótulo e entrada para o código
label = tk.Label(root, text='Insira a chave da licença:')
label.pack(pady=10)
entry = tk.Entry(root)
entry.pack(pady=10)

# Botão para submeter o código
button = tk.Button(root, text='Submeter', command=verificar_codigo)
button.pack(pady=20)

# Iniciar o loop de eventos
root.mainloop()
