import nc from "next-connect";
import supabase from "../../../utils/initSupabase";

const handler = nc({
  onError: (error, req, res, next) => {
    console.log(error);
    res.status(500).end();
  },
});

handler.post(async (req, res) => {
  const { newTodo } = JSON.parse(req.body);

  const result = await supabase.from("todos").insert([{ title: newTodo }]);

  const todo = result.data[0];
  res.send({ todo });
});

handler.put(async (req, res) => {
  const { completed } = JSON.parse(req.body);

  const result = await supabase
    .from("todos")
    .update({ completed })
    .match({ id: req.query.id });

  const todo = result.data[0];

  res.send({ todo });
});

handler.delete(async (req, res) => {
  const result = await supabase
    .from("todos")
    .delete()
    .match({ id: req.query.id });

  const todo = result.data[0];

  res.send({ todo });
});

export default handler;
