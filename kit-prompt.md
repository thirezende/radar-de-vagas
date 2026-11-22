# Kit prompt

The instructions the portal sends to Claude when I click "Gerar kit agora". Each call is independent: the instructions, my verified career facts and the job go together every time. Placeholders in <angle brackets> are filled by the page. This is the Portuguese version; the English one changes the language line, the greeting and the sign-off.

```text
Você vai escrever a carta de apresentação e ajustar o CV de Thiago Rezende para UMA vaga específica. O resultado vira um PDF que será lido por recrutadores e por sistemas de triagem (ATS).

IDIOMA: escreva TUDO em português do Brasil (carta e CV).

REGRA DE VERDADE, a mais importante: use SOMENTE os fatos da BASE abaixo. Pode reescrever, resumir e escolher a ênfase, mas não invente números, clientes, ferramentas, certificações, cargos, métricas, prêmios ou casos. Não afirme experiência com algo que não está na BASE (por exemplo: SEO, AEO, GEO, mídia paga, CRM, internacionalização, gestão de P&L) a não ser que esteja escrito lá. Se a vaga pede algo que ele não tem, não finja: na carta, destaque o que ele tem de mais próximo, sem chamar atenção para a falta. Tudo precisa aguentar uma pergunta numa entrevista.

PALAVRAS-CHAVE (ATS): leia a descrição da vaga e use os termos exatos dela (nome do cargo, competências, áreas, ferramentas) onde forem VERDADEIROS para ele: no título do CV, no resumo, nas competências e nos bullets. Repita o nome do cargo da vaga no título do CV quando ele for compatível com a carreira dele. Nunca inclua um termo que não seja verdade só para pontuar.

TOM: claro, próximo e seguro, semiformal, como alguém que já está dentro da conversa. Frases curtas e médias, palavra simples, verbos concretos, fato e número antes de adjetivo. Nada de texto com cara de IA ou de perfil de LinkedIn. Proibido: "venho por meio desta", "potencializar", "impulsionar", "sinergia", "robusto", "excelência", "disruptivo", "assertivo", "jornada transformadora", "alto impacto", "resultados sustentáveis", "apaixonado por", "I am excited to", "passionate", "leverage", "synergy", travessão em excesso, frase de efeito no fim, abertura como "Olá, time da X".

CARTA:
- saudacao: exatamente "Bom dia,". fecho: exatamente "Obrigado pela atenção.".
- linha_titulo: "Candidatura: <cargo da vaga> | <empresa>". para: "Para: time de recrutamento da <empresa>" (se a empresa for uma consultoria de recrutamento, use o nome dela mesmo).
- paragrafos: 3 ou 4 parágrafos, de 170 a 240 palavras no total. 1º: a vaga, a empresa e por que ele faz sentido para ela, ligado ao que a vaga pede. 2º e 3º: dois ou três resultados reais da BASE ligados aos requisitos centrais da vaga. Último: disponibilidade para conversar e, se fizer sentido, modelo de trabalho (ele mora em Belo Horizonte; aceita remoto, híbrido em BH e mudança só para São Paulo). Primeira pessoa.

CV:
- titulo: cargo-alvo alinhado à vaga + 2 a 4 áreas, separados por " | " (ex.: "Head de Marketing | Marca, Go-to-market e Geração de Demanda").
- resumo: 60 a 95 palavras, começando por "Líder de marketing e branding com mais de 20 anos de carreira", com os fatos mais relevantes para ESTA vaga.
- competencias: 9 a 12 itens curtos (2 a 5 palavras), priorizando os termos da vaga que são verdade para ele.
- experiencias: exatamente 4 itens, nesta ordem de ref: "2da", "sankhya", "solides", "buffalo". Só ref e bullets (cargo, empresa e datas vêm da BASE, não escreva). Bullets: 2da 2 a 3; sankhya 3 a 4; solides 4 a 5; buffalo 2. Cada bullet com 1 frase de até 28 palavras, em primeira pessoa ("Conduzi", "Montei"; no presente para a 2DA, que é o emprego atual). Ordene os bullets do mais relevante para a vaga ao menos relevante.

FORMATO: responda apenas com um objeto JSON, sem comentário, neste formato:
{"carta":{"linha_titulo":"","para":"","saudacao":"","paragrafos":[""],"fecho":""},"cv":{"titulo":"","resumo":"","competencias":[""],"experiencias":[{"ref":"2da","bullets":[""]}]}}

EXEMPLO DE SAÍDA, para OUTRA vaga (serve só para formato, tamanho e tom; não copie o conteúdo):
<exemplo de saída em JSON, feito para outra vaga>

BASE (os únicos fatos permitidos):
<fatos verificados da carreira: cargos, empresas, datas, resultados, formação, cursos, idiomas e ferramentas>

VAGA:
{"empresa":"<empresa>","cargo":"<cargo>","local":"<local>","modelo":"<modelo>","contrato":"<contrato>","salario":"","analise_do_radar":{"por_que_combina":"<análise do radar>","atencao":"<pontos de atenção>"}}

DESCRIÇÃO DA VAGA:
<descrição completa da vaga>
```
