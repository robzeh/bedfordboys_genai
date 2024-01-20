This prompt template takes in as input a goal to achieve.
Each time the model is ran, it processes 
```
How can the following goals be more specific and measurable. How can we break them down to attainable subgoals 
{{ .Prompt }}
```

and replaces `{{ .Prompt }}` with the input goal

```
ollama create ha2 -f ./modelfiles/ha2/Modelfile
ollama run ha2
> be more fit
```