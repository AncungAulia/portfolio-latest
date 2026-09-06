import { ProjectDetail } from "@/modules/projects/ProjectDetail";
import { PROJECTS, findProject } from "@/data/projects";

export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = findProject(slug);
  return { title: project?.title ?? "Project" };
}

export default async function Page({ params }: PageProps<"/projects/[slug]">) {
  return <ProjectDetail params={params} />;
}
