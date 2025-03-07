package _Self.buildTypes

import jetbrains.buildServer.configs.kotlin.*
import jetbrains.buildServer.configs.kotlin.buildSteps.nodeJS

project {
    // Define a VCS root for your repository.
    vcsRoot(MyGitVcs)

    // Define a build configuration (build type)
    buildType(MyBuildPipeline)
}

// Git VCS root definition.
object MyGitVcs : GitVcsRoot({
    name = "Test Api Repo"
    url = "https://github.com/JeelGajera/test-apirepo-action.git"
    branch = "refs/heads/main"
    // Optionally, configure authentication here if needed.
})

// Build configuration that defines your build pipeline.
object MyBuildPipeline : BuildType({
    name = "zt-test-plugin"
    steps {
        nodeJS {
            name = "Build Project & Install Deps"
            id = "Build_Project_Install_Deps"
            shellScript = """
                npm ci
                npm run build
            """.trimIndent()
        }
        step {
            name = "Vulnerability Scan"
            id = "Vulnerability_Scan"
            type = "vulnerabilityScanRunner"
            param("deploymentUrl", "https://demo.com")
        }
}})

