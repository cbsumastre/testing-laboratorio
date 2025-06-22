import { mapProjectFromApiToVm } from "./project.mapper"
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';


describe("mapProjectFromApiToVm specs", () => {
    it("should return empty viewModel.Project when it feeds undefined", () => {
        // Arrange
        const project: apiModel.Project = undefined

        // Act
        const result: viewModel.Project = mapProjectFromApiToVm(project);

        // Assert
        const expectResult: viewModel.Project = viewModel.createEmptyProject();
        expect(result).toEqual(expectResult);
    })

    it("should return empty viewModel.Project when it feeds null", () => {
        // Arrange
        const project: apiModel.Project = null

        // Act
        const result: viewModel.Project = mapProjectFromApiToVm(project);

        // Assert
        const expectResult: viewModel.Project = viewModel.createEmptyProject();
        expect(result).toEqual(expectResult);
    })

    it("should return a viewModel.Project with no employees assigned when the apiModel.Project has no employees assigned", () => {
        // Arrange
        const testProject = {
            id: "1",
            isActive: true,
            name: "Test project",
            externalId: "externalId",
            employees: [],
            comments: "test comment"
        }

        const project: apiModel.Project = { ...testProject }

        // Act
        const result: viewModel.Project = mapProjectFromApiToVm(project);

        // Assert
        const expectResult: viewModel.Project = { ...testProject }

        expect(result).toEqual(expectResult);
        expect(result.employees).toHaveLength(0)
    })

    it("should return a viewModel.Project with the same employees assigned", () => {

        // Arrange
        const employees: apiModel.EmployeeSummary[] = [{ id: "1", employeeName: "First employee", isAssigned: true },
        { id: "2", employeeName: "Second employee", },
        { id: "3", employeeName: "Third employee", isAssigned: true }
        ]

        const testProject = {
            id: "1",
            isActive: false,
            name: "Test project",
            externalId: "externalId",
            employees,
            comments: "test comment"
        }

        const project: apiModel.Project = { ...testProject }

        // Act
        const result: viewModel.Project = mapProjectFromApiToVm(project);

        // Assert
        const expectResult: viewModel.Project = { ...testProject }

        expect(result).toEqual(expectResult);
        expect(result.employees).toEqual(employees);
        expect(result.employees).toHaveLength(3);
    })

})
