import { ApolloWrapper } from "../../components/ApolloWrapper";
export default function Layout({ children }: React.PropsWithChildren) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}