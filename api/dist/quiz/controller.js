"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizController = void 0;
const common_1 = require("@nestjs/common");
const create_dto_1 = require("./dto/create.dto");
const update_dto_1 = require("./dto/update.dto");
const service_1 = require("./service");
let QuizController = class QuizController {
    constructor(service) {
        this.service = service;
    }
    async index(res, query) {
        const sort = {};
        query.sort
            ? (sort[JSON.parse(query.sort)[0]] =
                JSON.parse(query.sort)[1] === 'ASC' ? 1 : -1)
            : null;
        const range = query.range ? JSON.parse(query.range) : [0, 10];
        const [rangeStart, rangeEnd] = [...range];
        const limit = rangeEnd - rangeStart + 1;
        const skip = rangeStart;
        const filter = query.filter ? JSON.parse(query.filter) : {};
        const result = await this.service.findAll(filter, sort, skip, limit);
        return res
            .set({
            'Content-Range': result.count,
            'Access-Control-Expose-Headers': 'Content-Range',
        })
            .json(result.data);
    }
    async aggregate(title, description) {
        return this.service.customMethod(title, description);
    }
    async find(id) {
        return await this.service.findOne(id);
    }
    async create(createQuizDto) {
        return await this.service.create(createQuizDto);
    }
    async update(id, updateQuizDto) {
        return await this.service.update(id, updateQuizDto);
    }
    async delete(id) {
        return await this.service.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/:title/:description'),
    __param(0, (0, common_1.Param)('title')),
    __param(1, (0, common_1.Param)('description')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "aggregate", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "find", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateQuizDto]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dto_1.UpdateQuizDto]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "delete", null);
QuizController = __decorate([
    (0, common_1.Controller)('quizzes'),
    __metadata("design:paramtypes", [service_1.QuizService])
], QuizController);
exports.QuizController = QuizController;
//# sourceMappingURL=controller.js.map