package _Self.buildTypes

import jetbrains.buildServer.configs.kotlin.*
import jetbrains.buildServer.configs.kotlin.buildSteps.nodeJS

object TestRepoPipeline : BuildType({
    name = "test-repo-pipeline"

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
    }
})
