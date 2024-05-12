import { useRef } from "react";
import Button from "../button";
import Form from "../form";
import Input from "../input";

export default function Login({
  onSubmit,
}: {
  onSubmit: (data: object) => void;
}) {
  const org_url: any = useRef();
  const client_id: any = useRef();
  const client_secret: any = useRef();
  const username: any = useRef();
  const password: any = useRef();

  const handleOnsubmit = async (
    e: React.FormEvent<HTMLFormControlsCollection>
  ) => {
    e.preventDefault();
    if (onSubmit)
      onSubmit({
        org_url: org_url.current.value,
        client_id: client_id.current.value,
        client_secret: client_secret.current.value,
        username: username.current.value,
        password: password.current.value,
      });
  };

  return (
    <Form onSubmit={(e) => handleOnsubmit(e)}>
      <div className="flex flex-wrap mt-4 justify-center">
        <Input
          label="Org Url"
          id="org_url"
          containerClassName="w-5/12 mr-4"
          className="w-full p-1"
          placeholder="Organization URL"
          inputRef={org_url}
          required
        />
        <Input
          label="Client Id"
          id="client_id"
          containerClassName="w-5/12 ml-4"
          className="w-full p-1"
          placeholder="Client Id"
          inputRef={client_id}
          required
        />
        <Input
          label="Client Secret"
          id="client_secret"
          containerClassName="w-5/12 mr-4 my-4"
          className="w-full p-1"
          placeholder="Client Secret"
          inputRef={client_secret}
          required
        />
        <Input
          label="Username"
          id="username"
          containerClassName="w-5/12 ml-4 my-4"
          className="w-full p-1"
          placeholder="Username"
          inputRef={username}
          required
        />
        <Input
          label="Password"
          id="password"
          containerClassName="w-5/12 mr-4"
          className="w-full p-1"
          placeholder="Password"
          inputRef={password}
          required
        />
        <div className="w-5/12 mr-4 flex justify-center items-center pt-6">
          <Button className="px-8 py-2">Login</Button>
        </div>
      </div>
    </Form>
  );
}
