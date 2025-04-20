#instalar a versão 0.28 com o comando abaixo:
# pip install openai==0.28

import openai


openai.api_key= 'SUA API KEY AQUI'



def get_car_ai_bio(model, brand, year):
   response  = openai.ChatCompletion.create(
       model = 'gpt-3.5-turbo',
         messages = [
              {
                'role': 'user',
                'content': f'Crie uma biografia para o carro {model} da marca {brand} do ano {year} resumido em 250 caracteres'
              }
         ],
            max_tokens = 1000,
    )
   return response.choices[0].message.content
