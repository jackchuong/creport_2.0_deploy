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
exports.QuizSetService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("./schemas/schema");
let QuizSetService = class QuizSetService {
    constructor(model) {
        this.model = model;
    }
    async findAll(filter, sort, skip, limit) {
        const count = await this.model.find(filter).count().exec();
        const data = await this.model
            .find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec();
        const result = { count: count, data: data };
        return result;
    }
    async customMethod(title, description) {
        return await this.model
            .aggregate([{ $match: { title: title, description: description } }])
            .exec();
    }
    async findOne(id) {
        return await this.model.findById(id).exec();
    }
    async create(createQuizSetDto) {
        return await new this.model(Object.assign(Object.assign({}, createQuizSetDto), { createdAt: new Date() })).save();
    }
    async update(id, updateQuizSetDto) {
        return await this.model.findByIdAndUpdate(id, updateQuizSetDto).exec();
    }
    async delete(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
};
QuizSetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_1.QuizSet.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], QuizSetService);
exports.QuizSetService = QuizSetService;
//# sourceMappingURL=service.js.map